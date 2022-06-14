const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
const { toAudio, toPTT } = require('../lib/converter')
let handler = async (m, { msgsz, args, usedPrefix, command }) => {
  if (!args[0]) throw `${nolink}`
  if (!args[0].match(/tiktok/gi)) throw `URL Invalid`
  const sentMsg = await conn.reply(m.chat, wait)
  await msgsz.reply(m.chat, `Downloading media from Tiktok`, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: insta,
    mediaType: 2,
    description: deslink , 
    title: linkname,
    body: wm, //`${fileSizeH}`,
    thumbnail: await(await fetch(img)).buffer(),
    sourceUrl: linkgc
     }}
  })
  try {
    var anu = await Tiktok(args[0])
    var { url, title, thumbnail, duration, source, medias } = anu
    var { quality, extension, size, formattedSize, } = anu.medias[0]
    await msgsz.sendMedia(m.chat, medias[2].url, null, {mentions: [m.sender]})
    await msgsz.sendMedia(m.chat, medias[2].url, null, {ptt: true, mentions: [m.sender]})
    } catch {
    try {
    var anu = await Tiktok(args[0])
    var { url, title, thumbnail, duration, source, medias } = anu
    var { quality, extension, size, formattedSize, } = anu.medias[0]
    let v = medias[1].url
    let a = await(await fetch(v)).buffer()
    let au = await toAudio(a, 'mp4')
    let vn = await toPTT(a, 'mp4') 
    await msgsz.sendFile(m.chat, au.data, 'tiktok.mp3', '', 0, 0, { mentions: [m.sender], mimetype: 'audio/mp4', asDocument: global.db.data.chats[m.chat].useDocument })
    await msgsz.sendFile(m.chat, vn.data, 'tiktok.opus', '', 0, 1, { mentions: [m.sender], mimetype: 'audio/mp4', asDocument: global.db.data.chats[m.chat].useDocument })
  } catch {
    try {
    var anuu = await tiktok(args[0])
    var { nowm, wm, audio } = anuu
    let v = nowm
    let a = await(await fetch(v)).buffer()
    let au = await toAudio(a, 'mp4')
    let vn = await toPTT(a, 'mp4')
    await msgsz.sendFile(m.chat, au.data, 'tiktok.mp3', '', 0, 0, { mentions: [m.sender], mimetype: 'audio/mp4', asDocument: global.db.data.chats[m.chat].useDocument })
    await msgsz.sendFile(m.chat, vn.data, 'tiktok.opus', '', 0, 1, { mentions: [m.sender], mimetype: 'audio/mp4', asDocument: global.db.data.chats[m.chat].useDocument })
  } catch {
    throw msgsz.reply(m.chat, eror, m ) 
      }
    }
  }
}
handler.help1 = ['ᴛɪᴋᴛᴏᴋᴀᴜᴅɪᴏ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺𝙰𝚄𝙳𝙸𝙾'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(a(udio)?|mp3|sound)(dl)?(download(er)?)?$/i



module.exports = handler
