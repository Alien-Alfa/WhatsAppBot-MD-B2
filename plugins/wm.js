let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz, usedPrefix, command, text    }) => {
 try {     if(!text) throw `No input found?\nExample: *${usedPrefix}${command} Alien-Alfa,WhatsApp-Bot-MD*`
    try {
    var [p, a] = text.split `,`
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    } finally {
     if(sel) msgsz.sendStimg(m.chat, sel, m, { packname: p || '', author: a || '' })
     else throw `Reply sticker with caption *${usedPrefix}${command} packname,author*`
  }
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

    handler.help1 = ['wm'].map(v => v + ' <packname,author>')
handler.help = ['𝚆𝙼'].map(v => v + '')
handler.tags = ['sticker', 'premium']
handler.command = /^(wm)$/i
handler.premium = true

module.exports = handler
