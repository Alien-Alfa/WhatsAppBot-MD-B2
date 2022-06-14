let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter Text'
  conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://api.zeks.me/api/wolflogo?apikey=apivinz&text1=${response[0]}&text2=${response[1]}`
  msgsz.sendFile(m.chat, res, 'wolflogo.jpg', mainfooter, m, false)
}
handler.help1 = ['wolflogo'].map(v => v + ' <text|text>')
handler.help = ['𝚆𝙾𝙻𝙵𝙻𝙾𝙶𝙾'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(wolflogo)$/i

module.exports = handler

