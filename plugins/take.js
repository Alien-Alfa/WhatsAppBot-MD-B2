let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz    }) => {
 try {  
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    if(sel) await msgsz.sendStimg(m.chat, sel, m, { packname: pclg, author: aclg })
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

    handler.help1 = ['ᴛᴀᴋᴇ <ʀᴇᴘʟʏ sᴛɪᴄᴋᴇʀ>']
handler.help = ['𝚃𝙰𝙺𝙴']

handler.tags = ['owner']
handler.command = /^(take)$/i

module.exports = handler
