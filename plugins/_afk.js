let handler = m => m
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        msgsz.sendB(m.chat, `
_You re not AFK anymore_ ${user.afkReason ? ' after ' + user.afkReason : ''}
For ${clockString(new Date - user.afk)}
`.trim(), wm, null, [[`Menu`, `.menu`]], m)
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user) continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0) continue
        let reason = user.afkReason || ''
        msgsz.reply(m.chat,`*Hey Buddy,*
      Please Dont Tag Him,

He is *AFK* ${reason ? 'because ' + reason : 'of some personal matters'}
*For ${clockString(new Date - afkTime)}*
`, m)
    }
    return true
}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
