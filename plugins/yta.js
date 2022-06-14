let fetch = require('node-fetch')
let axios = require('axios')
const { servers, yta } = require('../lib/y2mate')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, text, args, isPrems, isOwner }) => {
  try {
  if (!text) throw `uhm where is the url?`
  let ras = `url is wrong, this command to download watch/shorts`
  if (!args[0].match(/(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)\/(watch|shorts)|(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)/gi)) throw ra
  let limit 
  if((isOwner || isPrems)) limit = 250
  else limit = 100
  if (!args || !args[0]) throw `uhm where is the url?`
  const sentMsg = await m.reply(wait)
  try {




  var audi = await youtubedl(args[0])
  var { thumbnail, audio, title } = audi
  var det = audi.audio['128kbps']
  var { quality, fileSizeH, fileSize } = det
  var url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
  let capt = `🎧 *YouTube MP3*
  
📌 *Title:* ${title}
🎚 *Size:* ${fileSizeH}
✨ *Quality:* ${quality}
${isLimit ? `❌ *File size above ${limit} MB, download yourself*\n` : ''}🚀 *Link:* ${urlshort}` 
  await msgsz.sendMedia(m.chat, thumbnail, sentMsg, {jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: capt})
  if (!isLimit) await msgsz.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, // `${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(), 
   }}
  }) 
  





} catch {
  try {
  var audi = await youtubedlv2(args[0])
  var { thumbnail, audio, title } = audi
  var det = audi.audio['128kbps']
  var { quality, fileSizeH, fileSize } = det
  var url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await msgsz.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }}
  }) 
  } catch {
  try {
  var audi = await youtubedlv3(args[0])
  var { thumbnail, audio, title } = audi
  var det = audi.audio['128kbps']
  var { quality, fileSizeH, fileSize } = det
  var url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if(!isLimit) await msgsz.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }}
  }) 
  } catch {
  try {
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < filesize
  if(!isLimit) await msgsz.sendMedia(m.chat, dl_link, null, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${filesizeF}`,
    thumbnail: await(await fetch(thumb)).buffer(), 
   }}
  })
  } catch {
    throw eror 
        }
      }
    }
  }
}


catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

handler.help1 = ['yta <url>']
handler.help = ['𝚈𝚃𝙰']
handler.tags = ['downloader']
handler.command = /^(yt(a(udio)?|mpp?3|musik|ashort))$/i


module.exports = handler





