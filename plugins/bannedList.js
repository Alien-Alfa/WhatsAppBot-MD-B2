let handler = async (m, { jid, msgsz, usedPrefix, command, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let caption = `
${sa}${kki} Banned chats ${kka}
${gx} Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
${gy} ${i + 1}. ${msgsz.getName(jid) == undefined ? 'Unknown' : msgsz.getName(jid)}
${gy} ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : ''}
${sb}

${sa}${kki} Banned User ${kka}
${gx} Total : ${users.length} Users${users ? '\n' + users.map(([jid], i) => `
${gy} ${i + 1}. ${msgsz.getName(jid) == undefined ? 'Unknown' : msgsz.getName(jid)}
${gy} ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : ''}
${sb}
`.trim()
    msgsz.reply(m.chat, caption, m, { contextInfo: { mentionedJid: msgsz.parseMention(caption) } })
}
handler.help1 = ['ʟɪsᴛʙᴀɴ']

handler.help = ['𝙻𝙸𝚂𝚃𝙱𝙰𝙽']
handler.tags = ['info']
handler.command = /^list?ban(ned)?|ban(ned)?list?|daftarban(ned)?$/i

handler.owner = false

module.exports = handler

