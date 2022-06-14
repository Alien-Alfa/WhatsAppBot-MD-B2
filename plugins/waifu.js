let fetch = require('node-fetch')
let handler = async (m, { msgsz    }) => {
 try { let res = await fetch('https://api.waifu.pics/sfw/waifu')
  if (!res.ok) throw 'Error !! Website is down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  msgsz.sendFile(m.chat, json.url, '', mainfooter, m, 0, { thumbnail: Buffer.alloc(0) })
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

    handler.help1 = ['waifu']
handler.help = ['𝚆𝙰𝙸𝙵𝚄']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

handler.limit = true

module.exports = handler
