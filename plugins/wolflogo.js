let fetch = require('node-fetch')
let handler = async (m, { msgsz, args    }) => {
 try {  response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter Text'
  msgsz.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://api.zeks.me/api/wolflogo?apikey=apivinz&text1=${response[0]}&text2=${response[1]}`
  msgsz.sendFile(m.chat, res, 'wolflogo.jpg', mainfooter, m, false)
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

    handler.help1 = ['wolflogo'].map(v => v + ' <text|text>')
handler.help = ['𝚆𝙾𝙻𝙵𝙻𝙾𝙶𝙾'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(wolflogo)$/i

module.exports = handler

