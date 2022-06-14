let handler = async (m, { msgsz }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    msgsz.reply(m.chat, `Limit @${who.split(`@`)[0]} *${user.limit}*`, m, {mentions: [who]})
}
handler.help1 = ['ʟɪᴍɪᴛ <@ᴜsᴇʀ>']
handler.help = ['𝙻𝙸𝙼𝙸𝚃']
handler.tags = ['xp']
handler.command = /^(my|limit)$/i

module.exports = handler
