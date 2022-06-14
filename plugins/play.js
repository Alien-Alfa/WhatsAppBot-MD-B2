const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
const { servers, yta, ytv } = require('../lib/y2mate')
let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { msgsz, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. what are you looking for?\n\nExample:\n${usedPrefix + command} california`
  let chat = global.db.data.chats[m.chat]
  let results = await youtubeSearch(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Content Not found'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      conn.reply(m.chat, `Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'all servers fail'
  if (yt2 === false) throw 'all servers fail'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
let anu =  `
*Title:* ${title}
*File Size Audio:* ${filesizeF}
*File Size Video:* ${yt2.filesizeF}
*Server y2mate:* ${usedServer}


`
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: anu,
           locationMessage: { 
           jpegThumbnail: await (await fetch(thumb)).buffer() }, 
           hydratedFooterText: global.mainfooter,
           hydratedButtons: [{
             urlButton: {
               displayText: 'ᴜʀʟ',
               url: vid.itl
             }

           },
               {
             quickReplyButton: {
               displayText: 'Video 360p',
               id: `.ytmp4 ${vid.url}`,
             }

            },
               {
             quickReplyButton: {
               displayText: 'HD Video',
               id: `.ytvHD ${vid.url}`,
             }

            },
               {
             quickReplyButton: {
               displayText: 'Audio',
               id: `.ytmp3 ${vid.url}`,
             }

           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //msgsz.reply(m.chat, text.trim(), m)
    return await msgsz.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
}
handler.help1 = ['play'].map(v => v + ' <pencarian>')
handler.help = ['𝙿𝙻𝙰𝚈'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(p|play)$/i

handler.exp = 0

module.exports = handler

