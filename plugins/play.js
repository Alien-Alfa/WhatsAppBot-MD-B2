


const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, command, text, usedPrefix    }) => {
try {
  let lang = db.data.users[m.sender].language
    let teks = text ? text : m.quoted && m.quoted.text 
    let con = `Example: ${usedPrefix}${command} i see your monster`
    if(!teks) throw con
    await msgsz.reply(m.chat,wait)
    //let titlex = await msgsz.trans(lang, titlink).catch(async _ => await msgsz.trans2(lang, titlink))
    let anu = await youtubeSearch(`${teks} Song`)
    let vid = anu.video
    let vide = vid[0]
    let novid = await msgsz.trans(lang, 'Video/Audio Not found').catch(async _ => await msgsz.trans2(lang, 'Video/Audio Not found'))
    if(!vide) return msgsz.sendB(m.chat, novid, wm, null, [[await msgsz.trans(lang, 'Try again').catch(async _ => await msgsz.trans2(lang, 'Try again')), `.play ${teks} Heat waves`]], m) 
    let { authorName, title, url, thumbnail, durationH, viewH, publishedTime } = vide
    let capt = ` 
*𝐓𝐢𝐭𝐥𝐞:* ${title}
*𝐕𝐢𝐝𝐮𝐫𝐥*: ${url}
*𝐕𝐢𝐞𝐰𝐞𝐫𝐬:* ${viewH}
*𝐂𝐡𝐚𝐧𝐧𝐞𝐥:* ${authorName}
*𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧:* ${durationH}
*𝐔𝐩𝐥𝐨𝐚𝐝𝐞𝐝:* ${publishedTime} 
`
let btnzoo = [{
  buttonId:'ᴀᴜᴅɪᴏ',
  buttonText: {
      displayText: `#psp ${url}`
  },
  buttonId:'ᴠɪᴅᴇᴏ',
  buttonText: {
      displayText: `#ytv ${url}`
  }
}]
let thumz = await(await fetch(thumbnail)).buffer()

let butonz= [['ᴠɪᴅᴇᴏ', `.ytv ${url}`]]

let chat = global.db.data.chats[m.chat]

await msgsz.sendFilez(m.chat, null, `Thumb.png`, '', m, butonz, 1, {
  asDocument: chat.useDocument,  mimetype: 'image/png', ptt: true, contextInfo: {
    mentions:  [m.sender],
      externalAdReply: {
          title: title, 
          body: bodlink,
          description: deslink,
          mediaType: 2,
        thumbnail: await(await fetch(thumbnail)).buffer(),
       mediaUrl: `${url}`,
       sourceUrl: `${url}`
              }
   }
})
/*
await msgsz.sendFilez(m.chat, capt, wm, btnz, {
          contextInfo: { 
         mentionedJid: [m.sender],
         externalAdReply :{
         mediaUrl: `${url}`,
         mediaType: 2,
         description: deslink , 
         title: title,
         body: bodlink, //`${fileSizeH}`,
         thumbnail: await(await fetch(thumbnail)).buffer()
  
           }}})



*/
        

await msgsz.sendB(m.chat, 'ꜱᴇʟᴇᴄᴛ ᴀɴ ᴏᴘᴛɪᴏɴ', wm, thumbnail, [['ᴀᴜᴅɪᴏ', `#psp ${url}`], ['ᴠɪᴅᴇᴏ', `.ytv ${url}`]], m)





}catch(e){
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


    handler.help1 = ['play'].map(v => v + ' <pencarian>')
    handler.help = ['𝙿𝙻𝙰𝚈'].map(v => v + '')
    handler.tags = ['downloader']
    handler.command = /^(p|play)$/i

module.exports = handler