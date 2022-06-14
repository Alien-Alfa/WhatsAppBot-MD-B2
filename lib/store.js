const {
    WALegacySocket,
    WASocket,
    WAConnection,
    WAConnectionOptions,
    Contact,
    Group,
    Message,
    MessageType
} = require('@adiwajshing/baileys')

/**
 * @param {import('@adiwajshing/baileys').WASocket | import('@adiwajshing/baileys').WALegacySocket}
 */
function bind(msgsz) {
    if (!msgsz.chats) msgsz.chats = {}
    /**
     * 
     * @param {import('@adiwajshing/baileys').Contact[]|{contacts:import('@adiwajshing/baileys').Contact[]}} contacts 
     * @returns 
     */
    function updateNameToDb(contacts) {
        if (!contacts) return
        try {
            contacts = contacts.contacts || contacts
            for (const contact of contacts) {
                const id = msgsz.decodeJid(contact.id)
                if (!id || id === 'status@broadcast') continue
                let chats = msgsz.chats[id]
                if (!chats) chats = msgsz.chats[id] = { ...contact, id }
                msgsz.chats[id] = {
                    ...chats,
                    ...({
                        ...contact, id, ...(id.endsWith('@g.us') ?
                            { subject: contact.subject || contact.name || chats.subject || '' } :
                            { name: contact.notify || contact.name || chats.name || chats.notify || '' })
                    } || {})
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
    msgsz.ev.on('contacts.upsert', updateNameToDb)
    msgsz.ev.on('groups.update', updateNameToDb)
    msgsz.ev.on('contacts.set', updateNameToDb)
    msgsz.ev.on('chats.set', async ({ chats }) => {
        try {
            for (let { id, name, readOnly } of chats) {
                id = msgsz.decodeJid(id)
                if (!id || id === 'status@broadcast') continue
                const isGroup = id.endsWith('@g.us')
                let chats = msgsz.chats[id]
                if (!chats) chats = msgsz.chats[id] = { id }
                chats.isChats = !readOnly
                if (name) chats[isGroup ? 'subject' : 'name'] = name
                if (isGroup) {
                    const metadata = await msgsz.groupMetadata(id).catch(_ => null)
                    if (name || metadata?.subject) chats.subject = name || metadata.subject
                    if (!metadata) continue
                    chats.metadata = metadata
                }
            }
        } catch (e) {
            console.error(e)
        }
    })
    msgsz.ev.on('group-participants.update', async function updateParticipantsToDb({ id, participants, action }) {
        if (!id) return
        id = msgsz.decodeJid(id)
        if (id === 'status@broadcast') return
        if (!(id in msgsz.chats)) msgsz.chats[id] = { id }
        let chats = msgsz.chats[id]
        chats.isChats = true
        const groupMetadata = await msgsz.groupMetadata(id).catch(_ => null)
        if (!groupMetadata) return
        chats.subject = groupMetadata.subject
        chats.metadata = groupMetadata
    })
    msgsz.ev.on('groups.update', async function groupUpdatePushToDb(groupsUpdates) {
        try {
            for (const update of groupsUpdates) {
                const id = msgsz.decodeJid(update.id)
                if (!id || id === 'status@broadcast') continue
                const isGroup = id.endsWith('@g.us')
                if (!isGroup) continue
                let chats = msgsz.chats[id]
                if (!chats) chats = msgsz.chats[id] = { id }
                chats.isChats = true
                const metadata = await msgsz.groupMetadata(id).catch(_ => null)
                if (metadata) chats.metadata = metadata
                if (update.subject || metadata?.subject) chats.subject = update.subject || metadata.subject
            }
        } catch (e) {
            console.error(e)
        }
    })
    msgsz.ev.on('chats.upsert', function chatsUpsertPushToDb(chatsUpsert) {
        try {
            const { id, name } = chatsUpsert
            if (!id || id === 'status@broadcast') return
            msgsz.chats[id] = { ...(msgsz.chats[id] || {}), ...chatsUpsert, isChats: true }
            const isGroup = id.endsWith('@g.us')
            if (isGroup) msgsz.insertAllGroup().catch(_ => null)
        } catch (e) {
            console.error(e)
        }
    })
    msgsz.ev.on('presence.update', async function presenceUpdatePushToDb({ id, presences }) {
        try {
            const sender = Object.keys(presences)[0] || id
            const _sender = msgsz.decodeJid(sender)
            const presence = presences[sender]['lastKnownPresence'] || 'composing'
            let chats = msgsz.chats[_sender]
            if (!chats) chats = msgsz.chats[_sender] = { id: sender }
            chats.presences = presence
            if (id.endsWith('@g.us')) {
                let chats = msgsz.chats[id]
                if (!chats) chats = msgsz.chats[id] = { id }
            }
        } catch (e) {
            console.error(e)
        }
    })
}
module.exports = bind