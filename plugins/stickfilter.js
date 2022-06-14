// hyzerr official
const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

let handler = async (m, { msgsz, usedPrefix, text }) => {
 let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickfilter <effectname>
*Example:* ${usedPrefix}stickfilter invert

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No Image Found'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} not supported`
  let img = await q.download()
  let url = await uploadImage(img)
  let apiUrl = global.API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
    avatar: url
  })
  try {
    let stiker = await sticker(null, apiUrl, global.packname, global.author)
    await msgsz.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  } catch (e) {
    conn.reply(m.chat, 'Conversion to Sticker Failed, Sending as Image Instead')
    await msgsz.sendFile(m.chat, apiUrl, 'image.png', null, m)
  }
}

handler.help1 = ['stickfilter (caption|reply media)']
handler.help = ['𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝙵𝙸𝙻𝚃𝙴𝚁']
handler.tags = ['sticker']
handler.command = /^(stickfilter)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler
