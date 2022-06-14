let handler = async (m, { msgsz }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    msgsz.reply(m.chat, `Level of @${who.split(`@`)[0]}*: ${user.level}*`, m, {mentions: [who]})
}
handler.help1 = ['ʟᴇᴠᴇʟ <@ᴜsᴇʀ>']
handler.help = ['𝙻𝙴𝚅𝙴𝙻']
handler.tags = ['xp']
handler.command = /^(level)$/i

module.exports = handler
