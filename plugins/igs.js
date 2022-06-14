const { igstory, igstory2 } = require('../lib/scrape')
const { instagramStory, instagramStoryv2 } = require('@bochilteam/scraper')
let handler = async (m, { msgsz, args, usedPrefix, command }) => {
    if (!args[0]) throw `where is the username?\n\nExample:\n\n${usedPrefix + command} alienalfa`
    if (args[0].startsWith('http') || args[0].startsWith('@')) throw `username salah\n\nExample: *${usedPrefix}${command} AlienAlfa*`
    try {
    await conn.reply(m.chat, wait)
    await msgsz.reply(m.chat, `Downloading ig story ${args[0]}`, 0, {
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
    //const res = await fetch(API('hardianto', '/api/download/igstory', { username: args[0] }, 'apikey'))
    const res = await fetch(`https://hardianto.xyz/api/download/igstory?username=${args[0]}&apikey=hardianto`)
    var anu = await res.json()
    var anuku = anu.medias
    for (let { url, preview } of anuku) 
    msgsz.sendMedia(m.chat, url, null, {mentions: [m.sender], jpegThumbnail: await(await fetch(preview)).buffer(), caption: ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`})
    } catch {
        try {
    const res2 = await scrape.igstory(args[0]).catch(async _=> await yzu.igstory(args[0]))
    for ( const { downloadUrl, url, preview, type, fileType } of res2 )
    msgsz.sendMedia(m.chat, url, null, { mentions: [m.sender], jpegThumbnail: await(await fetch(preview)).buffer(), caption: ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`})
    } catch {
        throw `No media found!`
    }                  
  }
}
handler.help1 = ['ɪɴsᴛᴀɢʀᴀᴍsᴛᴏʀʏ'].map(v => v + ' <ᴜsᴇʀɴᴀᴍᴇ>')

handler.help = ['𝙸𝙽𝚂𝚃𝙰𝙶𝙴𝙰𝙼𝚂𝚃𝙾𝚁𝚈'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^((igs|instagrams)(tory)?(dl)?(downloa?d(er)?)?)$/i



module.exports = handler
    
//by rasel 
