const { igstory, igstory2 } = require('../lib/scrape')
const { instagramStory, instagramStoryv2 } = require('@bochilteam/scraper')
let handler = async (m, { msgsz, args, usedPrefix, command    }) => {
 try {     if (!args[0]) throw `where is the username?\n\nExample:\n\n${usedPrefix + command} alienalfa`
    if (args[0].startsWith('http') || args[0].startsWith('@')) throw `username salah\n\nExample: *${usedPrefix}${command} AlienAlfa*`
    try {
    await msgsz.reply(m.chat, wait)
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

    handler.help1 = ['ɪɴsᴛᴀɢʀᴀᴍsᴛᴏʀʏ'].map(v => v + ' <ᴜsᴇʀɴᴀᴍᴇ>')

handler.help = ['𝙸𝙽𝚂𝚃𝙰𝙶𝙴𝙰𝙼𝚂𝚃𝙾𝚁𝚈'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^((igs|instagrams)(tory)?(dl)?(downloa?d(er)?)?)$/i



module.exports = handler
    
//by rasel 
