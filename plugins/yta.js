let limit = 30
let fetch = require('node-fetch')

const { servers, yta } = require('../lib/y2mate')
let handler = async(m, { msgsz, args, isPrems, isOwner }) => {
  if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
  let quality = args[1] ? args[1] : '128kbps'
  let media = await yta(text, quality)

let buffimg = await (await fetch(`${mainimgurl}`)).buffer()
  if (media.filesize >= 100000) return reply('File Over Limit \n\n\n '+util.format(media))



  
  
 
 


  if (!isLimit) msgsz.sendFile(m.chat, media.dl_link, title+`mp3`, '', m, 1, {
    asDocument: chat.useDocument, mimetype: 'audio/mp4', ptt: true, contextInfo: {
      mentions:  [m.sender],
        externalAdReply: {
          title: '▶︎ ━━━━━━━•────────────────── ', 
          body: 'Now Playing...',
          description: `${media.filesizeF}`,
          mediaType: 2,
          thumbnail: await (await fetch(global.thumbnail)).buffer(),
         mediaUrl: text,
         sourceUrl: mfwdurl
                }
     }
  })

}
handler.help1 = ['mp3', 'a'].map(v => 'yt' + v + ` <url> [server: ${servers.join(', ')}]`)
handler.help = ['𝚈𝚃𝙰'].map(v => '' + v + ``)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)?$/i
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
