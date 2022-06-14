let handler = async (m, { msgsz, args: [event], text }) => {
    if (!event) throw `List Event: welcome, bye, delete, promote, demote`
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? msgsz.parseMention(mentions) : []
    let participants = who.length ? who : [m.sender]
    let action = false
    conn.reply(m.chat, `Simulating ${event}...`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            action = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            action = 'remove'
            break
        case 'promote':
            action = 'promote'
            break
        case 'demote':
            action = 'demote'
            break
        case 'delete':
            deleted = m
            break
        default:
            throw `List Event: welcome, bye, delete, promote, demote`
    }
    if (action) return msgsz.participantsUpdate({
        id: m.chat,
        participants,
        action
    })
    return msgsz.onDelete(m)
}
handler.help1 = ['sɪᴍᴜʟᴀᴛᴇ <ᴇᴠᴇɴᴛ> [@ᴍᴇɴᴛɪᴏɴ]']
handler.help = ['𝚂𝙸𝙼𝚄𝙻𝙰𝚃𝙴']
handler.tags = ['owner']

handler.command = /^simulate$/i
module.exports = handler
