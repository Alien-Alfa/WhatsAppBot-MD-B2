let handler = async (m, { msgsz, args, participants }) => {
        let grup = await msgsz.getName(m.key.remoteJid)
        let mimin = m.isGroup ? NgeriAtmin(participants) : ''
        let txt = `List Group Admin  *${grup}*\n*Total:* ${mimin.length}\n\n`
        for (let min of mimin) {
                txt += `• @${min.split('@')[0]}\n`
        }
        msgsz.reply(m.chat, txt, m, { mentions: await msgsz.parseMention(txt) })
}
handler.help1 = ['ʟɪsᴛᴀᴅᴍɪɴ']
handler.help = ['𝙻𝙸𝚂𝚃𝙰𝙳𝙼𝙸𝙽']
handler.tags = ['group']
handler.command = /^(adminlist?|list?admin)$/i

handler.group = true

module.exports = handler


const NgeriAtmin = (participants) => {
        atminn = []
	for (let b of participants) {
		b.admin === "admin" ? atminn.push(b.id) : ''
		b.admin === "superadmin" ? atminn.push(b.id) : ''
	}
	return atminn
}
