let handler = async (m, { msgsz, isROwner }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		let img = await q.download()
		msgsz.updateProfilePicture(msgsz.user.jid, img).then(() => conn.reply(m.chat, 'Set Profile Bot!'))
	} else throw 'Reply image'
}

handler.help1 = ['ppbot', 'botpp'].map(v => 'set' + v)
handler.command = /^set(fullpp|botppf)$/i
handler.owner = true

module.exports = handler
