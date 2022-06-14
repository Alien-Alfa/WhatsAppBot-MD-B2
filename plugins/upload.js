const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  x = media.length/1024
  y = Math.ceil(x)
  z = Math.ceil(y/1024)
  if (y<1025)url= `${link}

File size : ${y} KB`
 if (y>1024) url =`${link}

 File size : ${z} MB`
conn.reply(m.chat, url)
}
handler.help1 = ['ᴜʀʟ (reply media)']
handler.help = ['𝚄𝚁𝙻']
handler.tags = ['tools']
handler.command = /^(url)$/i


module.exports = handler
