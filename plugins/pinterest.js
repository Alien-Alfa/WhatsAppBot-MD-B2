let xfar = require('xfarr-api')
let handler = async (m, { usedPrefix, command, msgsz, args }) => {
	 	  if (!args[0]) throw `Use Format: ${usedPrefix}${command} naruto`
xfar.Pinterest(args[0]).then(async data => {
let pincpt = `🔗Media Link : ${data.url}`
msgsz.sendFile(m.chat,data.url, 'pin.jpg', pincpt,m)})
}
handler.help1 = ['pinterest <keyword>']
handler.help = ['𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i

module.exports = handler
