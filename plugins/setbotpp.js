let handler = async (m, { msgsz, isROwner }) => {
	if(!isROwner) throw false 
    let bot = msgsz.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `reply to the picture!`
        msgsz.updateProfilePicture(bot, img)
        conn.reply(m.chat, '```Success```')
    }
}
handler.help1 = ['sᴇᴛʙᴏᴛᴘᴘ']
handler.help = ['𝚂𝙴𝚃𝙿𝙿']
handler.tags = ['owner']
handler.command = /^(set(bot)?pp)$/i

module.exports = handler
