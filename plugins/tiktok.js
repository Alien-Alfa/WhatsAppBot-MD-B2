const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
let handler = async (m, { msgsz, args, usedPrefix, command }) => {
  if (!args[0]) throw `${nolink}\n\nExample:\n${usedPrefix + command} https://vt.tiktok.com/ZGJBtcsDq/`
  if (!args[0].match(/tiktok/gi)) throw `URL Invalid`
  await msgsz.reply(m.chat, `Downloading media from Tiktok`, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: insta,
    mediaType: 2,
    description: deslink, 
    title: linkname,
    body: wm, //`${fileSizeH}`,
    thumbnail: await(await fetch(img)).buffer(),
    sourceUrl: linkgc
     }}
  })
  try {
  var anu = await Tiktok(args[0])
  var { url, medias } = anu
  //await msgsz.sendBI(m.chat, sel, wm, tt, 
  //[[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], 
  //sentMsg, {mentions: [m.sender], jpegThumbnail: await(await fetch(tt)).buffer()})
  let cap = ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`
  msgsz.sendBV(m.chat, cap, global.wm, medias[0].url, [[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], null, {mentions: [m.sender]})
  } catch {
    try {
    var anuu = await tiktok(args[0])
    var { wm } = anuu
    msgsz.sendBV(m.chat, cap, global.wm, wm, [[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], 0, {mentions: [m.sender]})
  } catch {
    throw msgsz.reply(m.chat, eror, m ) 
   }
 }
}
handler.help1 = ['ᴛɪᴋᴛᴏᴋ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(wm)?(dl)?(down(load)?(er)?)?$/i



module.exports = handler
