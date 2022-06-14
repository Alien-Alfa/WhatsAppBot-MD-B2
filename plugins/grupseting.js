let handler = async (m, { msgsz, isAdmin, isOwner, args, usedPrefix, command }) => {
	if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
     
	let isClose = {
		'open': 'not_announcement',
		'unmute': 'not_announcement',
		'on': 'not_announcement',
		'1': 'not_announcement',
		'close': 'announcement',
		'mute': 'announcement',
		'off': 'announcement',
		'0': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
		await msgsz.sendB(m.chat, `
Example:
${usedPrefix + command} close
${usedPrefix + command} open
	`.trim(), wm, null, [['Open', '#gc 1'], ['Close', '#gc 0']])
		throw false
	}
        try {
	await msgsz.groupSettingUpdate(m.chat, isClose)
        } catch {
         throw `Make bot as admin to use this command!`
   }
}
handler.help1 = ['ɢʀᴏᴜᴘ <ᴏᴘᴇɴ/ᴄʟᴏsᴇ>']
handler.help = ['𝙶𝚁𝙾𝚄𝙿 𝙾𝙿𝙴𝙽']
handler.help = ['𝙶𝚁𝙾𝚄𝙿 𝙲𝙻𝙾𝚂𝙴']
handler.tags = ['group']
handler.command = /^(gro?up|gc)$/i

//handler.botAdmin = true
handler.group = true 

module.exports = handler
