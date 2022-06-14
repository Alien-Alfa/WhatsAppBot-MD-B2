let fetch = require('node-fetch')
let handler = async (m, { text, msgsz    }) => {
 try {   if(!text) throw `Enter title`
  let res = await fetch(global.API('https://some-random-api.ml', '/lyrics', { title: text }))
  if (!res.ok) throw `lyric not found`
  let json = await res.json()
  if (!json.thumbnail.genius) throw msgsz.reply(m.chat, `
*${json.title}*

_${json.author}_

${json.lyrics}

${json.links.genius}
`)
  msgsz.sendMedia(m.chat, json.thumbnail.genius, m, {caption: `

*${json.title}*

_${json.author}_

${json.lyrics}

${json.links.genius}
`, jpegThumbnail: await(await fetch(json.thumbnail.genius)).buffer()})
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

    handler.help1 = ['ʟʏʀɪᴄs'].map(v => v + ' <ᴛᴇxᴛ>')
handler.help = ['𝙻𝚈𝚁𝙸𝙲𝚂'].map(v => v + ' ')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
