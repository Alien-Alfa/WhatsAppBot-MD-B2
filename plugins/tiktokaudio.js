const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
const { toAudio, toPTT } = require('../lib/converter')
let handler = async (m, { msgsz, args, usedPrefix, command    }) => {
 try { if (!args[0]) throw `${nolink}`
  if (!args[0].match(/tiktok/gi)) throw `URL Invalid`
  const sentMsg = await msgsz.reply(m.chat, wait)
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

    handler.help1 = ['ᴛɪᴋᴛᴏᴋᴀᴜᴅɪᴏ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺𝙰𝚄𝙳𝙸𝙾'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(a(udio)?|mp3|sound)(dl)?(download(er)?)?$/i



module.exports = handler
