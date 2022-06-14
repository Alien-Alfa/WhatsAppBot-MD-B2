let limit = 1024
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')
let handler = async (m, { msgsz, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Uhm... where is the url?'
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await ytv(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  let _thumb = {}
  try { _thumb = { thumbnail: await (await fetch(thumb)).buffer() } }
  catch (e) { }
  if (!isLimit) msgsz.sendFile(m.chat, dl_link, title+`mp4`, '', null, 1, {
  asDocument: chat.useDocument, mimetype: `video/mp4`, ptt: true, contextInfo: {
    mentions:  [m.sender],
      externalAdReply: {
          title: title, 
          body: filesizeF,
          description: wm,
          mediaType: 2,
        thumbnail: _thumb,
       mediaUrl: instaz,
       sourceUrl: mfwdurl
              }
   }
})




}
handler.help1 = ['mp4','v',''].map(v => 'yt' + v + ` <url>`)
handler.help = ['𝚈𝚃𝚅'].map(v => '' + v + ``)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
