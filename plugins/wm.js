let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz, usedPrefix, command, text }) => {
    if(!text) throw `No input found?\nExample: *${usedPrefix}${command} Alien-Alfa,WhatsApp-Bot-MD*`
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
handler.help1 = ['wm'].map(v => v + ' <packname,author>')
handler.help = ['𝚆𝙼'].map(v => v + '')
handler.tags = ['sticker', 'premium']
handler.command = /^(wm)$/i
handler.premium = true

module.exports = handler
