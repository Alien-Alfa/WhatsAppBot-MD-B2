const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { msgsz, usedPrefix, command, text, args    }) => {
 try { if (!text) throw `Cari apa?\nExample: *${usedPrefix}${command} dj i hope you're happy*`
  
  let results = await youtubeSearch(text)
  let thumb = results.video[0].thumbnail
  let anu = thumb+'.png'
  let { video, channel } = results 
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': return `    
*Title:* ${v.title}
*Duration:* ${v.durationH}
*Uploaded:* ${v.publishedTime}
*Viewers:* ${v.viewH} 
*Link:* ${v.url}
`
      case 'channel': return `
*Channel:* ${v.channelName}
*Subscriber:* ${v.subscriberH} 
*Total Video:* ${v.videoCount} video
*Link:* ${v.url}
`
    }
  }).filter(v => v).join('\n==========================')
  try {
  msgsz.sendMedia(m.chat, anu, m, {caption: `*YouTube Search*\n`+teks, jpegThumbnail: await(await fetch(anu)).buffer()})
  } catch {
    throw teks
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

    handler.help1 = ['ytsearch <ǫᴜᴇʀʏ>']
handler.help = ['𝚈𝚃𝚂']
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i

module.exports = handler
