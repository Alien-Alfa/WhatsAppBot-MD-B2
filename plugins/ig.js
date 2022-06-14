const { instagramdl, instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper')
const { igdl } = require('../lib/scrape')




let handler = async (m, { msgsz, args, usedPrefix, command }) => {
if (!args[0]) throw `_${nolink}_\n\nExample:\n${usedPrefix + command} https://www.instagram.com/p/CH1A1c9J5pY/?utm_medium=copy_link`
 if (args[0].startsWith('https://instagram.com/stories')) throw `it looks like you are using the story link, to download Instagram Story please use the command below\n\n*${usedPrefix}instagramstory <username>*`
 if (!args[0].match(/(https|http):\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `wrong url, this command to download post/reel/tv`
   await conn.reply(m.chat, global.loading)
   try {
   var a = await instagramdl(args[0])
   for(let { thumbnail, url } of a)
   msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: wm})
  } catch {
   try {
   var b = await instagramdlv2(args[0])
   for(let { thumbnail, url } of b)
   msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: wm})
  } catch {
   try {
   var c = await instagramdlv3(args[0])
   for(let { thumbnail, url } of c)
   msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: wm})
  } catch {
   try {
   var d = await instagramdlv4(args[0])
   for(let { thumbnail, url } of d)
   msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: wm})
  } catch {
   try {
   var e = igdl(args[0])
   for (let { url, preview } of e) 
   msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(preview)).buffer(), caption: wm})
  } catch {
   throw msgsz.reply(m.chat, eror, m ) 
     }
    }
   }
  }
 }
}



handler.help1 = ['ɪɴsᴛᴀɢʀᴀᴍ'].map(v => v + ' <ᴜʀʟ>')

handler.help = ['𝙸𝙶'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(ig|insta(gram))(dl)?(downloa?d(er)?)?$/i



module.exports = handler

