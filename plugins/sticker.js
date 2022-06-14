let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { msgsz, usedPrefix, command, text, args }) => {
    //try {
    var q = m.quoted ? m.quoted : m
    if(!q) throw `Send or reply to media with caption *${usedPrefix}${command}*\nNote: 10 second max video`
    var mime = (q.msg || q).mimetype || ''
    try {
    if (/webp/.test(mime)) {
        var med = await q.download()
        //var med = await webp2png(ras)
        var sel = med
        //msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if (/image/.test(mime)) {
        var med = await q.download()
        var sel = med
        //msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if (/video/.test(mime)) {
        var med = await q.download()
        var sel = med
        //msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    else if(isUrl) { 
        var url = `${args[0]}`
        var sel = url
        //msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
    } finally {
        if(sel) msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
        }
}
handler.help1 = ['sticker <reply/send media>']
handler.help = ['𝚂𝚃𝙸𝙲𝙺𝙴𝚁']
handler.tags = ['sticker']
handler.command = /^(s|stiker|sticker)$/i

module.exports = handler

/*
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
*/