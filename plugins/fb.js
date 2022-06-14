const { facebookdl, facebookdlv2, facebookdlv3 } = require('@bochilteam/scraper')
const { Facebook } = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async (m, { msgsz, args, usedPrefix, command    }) => {
 try {   if (!args[0]) throw `${nolink}\n\nExample:\n*${usedPrefix + command}* https://fb.watch/aYv0jAffAO/`
  if (!args[0].match(/(https:\/\/.www.facebook.com || fb.watch)/gi)) throw `*Link salah! Perintah ini untuk mengunduh media facebook dengan link*\n\nExample:\n${usedPrefix + command} https://fb.watch/aYv0jAffAO/`
  await msgsz.reply(m.chat, wait)
  await msgsz.reply(m.chat, 'Downloading media from Facebook', 0, {
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
      let res = await facebookdlv2(args[0])
      let data = res.result
      let { id, thumbnail } = await res
      let { url, quality } = await data[0]
      let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
      let sel = `🎬 *Facebook MP4*\n\n📌 *ID:* ${id}\n✨ *Quality:* ${quality}\n *Link:* ${urlshort}`
      msgsz.sendFile(m.chat, url, id+'.mp4', sel, 0, 0, {mentions: [m.sender], jpegThumbnail: await await(fetch(thumbnail)).buffer()})
  } catch {
   try {
     let res = await facebookdlv3(args[0])
      let data = res.result
      let { title, thumbnail } = await res
      let { url, quality } = await data[1]
      let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
      let sell = `🎬 *Facebook MP4*\n\n✨ *Quality:* ${quality}\n *Link:* ${urlshort}`
      msgsz.sendFile(m.chat, url, title+'.mp4', sell, 0, 0, {mentions: [m.sender], jpegThumbnail: await await(fetch(thumbnail)).buffer()})
  } catch {
   try {
     let anu = await scrape.facebook2(args[0])
     let { author, title, thumb, link_high, link_normal } = anu.hasil
     let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${link_high}`)).data
     let selll = `🎬 *Facebook MP4*\n\n👤 *Author:* ${author}\n📌 *Title:* ${title}\n *Link:* ${urlshort}`
     msgsz.sendFile(m.chat, link_high, title+'.mp4', selll, 0, 0, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumb)).buffer()})
  } catch {
   try {
     let b = await Facebook(args[0])
     let { title, thumbnail, duration, source, medias } = b
     let { url, quality, extension, size, formattedSize  } = medias[0]
     let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
     let sell = `🎬 *Facebook MP4*\n\n✨ *Quality:* ${quality}\n🎚 *Size:* ${formattedSize}\n *Link:* ${urlshort}`
     msgsz.sendMedia(m.chat, url, null, {caption: sell, mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer()})
  } catch { 
     throw msgsz.reply(m.chat, eror, m )
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

    handler.help1 = ['ғᴀᴄᴇʙᴏᴏᴋ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺'].map(v => v + '')

handler.tags = ['downloader']
handler.command = /^((fb|facebook)(d(own)?l(oad)?(er)?)?(mp4)?)$/i



module.exports = handler
