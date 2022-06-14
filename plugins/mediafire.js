const { mediafiredl } = require('@bochilteam/scraper')
let handler = async (m, { isOwner, isPrems, command, usedPrefix, text, args, msgsz    }) => {
 try {      var limit
     if((isOwner || isPrems)) limit = 250
     else limit = 100
     if (!args[0]) throw `${nolink}\n\nExample:\n${usedPrefix + command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`
     if (!args[0].match(/mediafire/gi)) throw `URL Invalid`
     const sentMsg = await msgsz.reply(m.chat, wait)
     await msgsz.reply(m.chat, `Downloading media from Mediafire`, 0, {
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
     let full = /f$/i.test(command)
     let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
     let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: u }))).buffer()
     let res = await mediafiredl(args[0])
     let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
     let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < filesize
     let capt = `📭 *Mediafire Downloader*

📝 *Name:* ${filename}
🎚 *Size:* ${filesizeH}
🗃 *Extension:* ${ext}
📤 *Uploaded:* ${aploud}
${isLimit ? `❌ *File size above ${limit} MB, download it yourself*\n` : ''} *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}` 
     
     if(ss) await msgsz.sendFile(m.chat, ss, 'screenshot.png', capt, sentMsg, 0, {jpegThumbnail: ss})
     try {
     if(!isLimit) await msgsz.sendMedia(m.chat, url, 0, {fileName: `${filename}`, mentions: [m.sender]})
     } catch {
      throw msgsz.reply(m.chat, eror, m ) 
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

    handler.help1 = ['ᴍᴇᴅɪᴀғɪʀᴇ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^(me?d(ia)?f(ire)?)$/i



module.exports = handler
