const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
let handler = async (m, { msgsz, args, usedPrefix, command }) => {
  if (!args[0]) throw `_${nolink}_\n\nExample:\n${usedPrefix + command} https://vm.tiktok.com/ZGJBtcsDq/`
  if (!args[0].match(/tiktok/gi)) throw `_Invalid URL_`
  await conn.reply(m.chat, wait)
  try {
  var anu = await Tiktok(args[0])
  var { medias } = anu
  let cap = ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${medias[1].url}`)).data}`
  await msgsz.sendMedia(m.chat, medias[1].url, null, {caption: cap, mentions: [m.sender]})
  } catch {
    try {
    var anuu = await tiktok(args[0])
    var { nowm } = anuu
    let cap = ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)).data}`
    msgsz.sendMedia(m.chat, nowm, 0, {caption: cap, mentions: [m.sender]})
  } catch {
    throw msgsz.reply(m.chat, eror, m ) 
   }
 }
}
handler.help1 = ['ᴛɪᴋᴛᴏᴋ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺'].map(v => v + '')
handler.tags = ['downloader', 'premium']
handler.command = /^(tt|tiktok)?(download(er)?)?$/i

handler.premium = true

module.exports = handler

