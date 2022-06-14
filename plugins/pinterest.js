let xfar = require('xfarr-api')
let handler = async (m, { usedPrefix, command, msgsz, args    }) => {
 try { 	 	  if (!args[0]) throw `Use Format: ${usedPrefix}${command} naruto`
xfar.Pinterest(args[0]).then(async data => {
let pincpt = `🔗Media Link : ${data.url}`
msgsz.sendFile(m.chat,data.url, 'pin.jpg', pincpt,m)})
}
   

    catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['pinterest <keyword>']
handler.help = ['𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃']
handler.tags = ['internet']
handler.command = /^(pinterest)$/i

module.exports = handler
