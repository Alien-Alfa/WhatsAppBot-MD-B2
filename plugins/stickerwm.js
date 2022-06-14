let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz, usedPrefix, command, text }) => {
  if(!text) return msgsz.reply(m.chat, `Enter Packname & Stickername \nExample: *${usedPrefix}${command} Alien-Alfa,WhatsApp-Bot-MD*`, m)
    try {
    var [p, a] = text.split `,`
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    } finally {
    if(sel) await msgsz.sendStimg(m.chat, sel, m, { packname: p || '', author: a || '' })
    else return msgsz.reply(m.chat, `Reply sticker with caption *${usedPrefix}${command} packname|author* `, m) 
  }
}   
handler.help1 = ['ᴡᴍ'].map(v => v + ' <ᴘᴀᴄᴋɴᴀᴍᴇ|ᴀᴜᴛʜᴏʀ>')
handler.help = ['𝚆𝙼']
handler.tags = ['sticker', 'premium']
handler.command = /^(wm)$/i

handler.premium = true 

module.exports = handler
