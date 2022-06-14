let handler = async(m, { msgsz, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    msgsz.sendB(m.chat, `*AFK MODE*\n\n${msgsz.getName(m.sender)} now AFK${text ? ': ' + text : ''}`, wm, null, [[`Menu`, `${usedPrefix}menu`]], m)
}
handler.help1 = ['ᴀғᴋ [ʀᴇᴀsᴏɴ]']
handler.help = ['𝙰𝙵𝙺']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler
