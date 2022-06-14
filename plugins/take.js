let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz }) => {
   
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    if(sel) await msgsz.sendStimg(m.chat, sel, m, { packname: pclg, author: aclg })
      }

handler.help1 = ['ᴛᴀᴋᴇ <ʀᴇᴘʟʏ sᴛɪᴄᴋᴇʀ>']
handler.help = ['𝚃𝙰𝙺𝙴']

handler.tags = ['owner']
handler.command = /^(take)$/i

module.exports = handler
