const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media Found/Reply to image/video/gif'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  msgsz.sendFile(m.chat, `https://api.xteam.xyz/imagetopdf?url=${link}&APIKEY=cristian9407`, 'NihKak', null, m)

}
//handler.help1 = ['topdf <reply image>']
//handler.help = ['𝚃𝙾𝙿𝙳𝙵']
//handler.tags = ['tools']
//handler.command = /^(topdf)$/i

handler.limit = true

module.exports = handler
