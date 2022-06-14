let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ').split('|')
   if (!args[0]) return conn.reply(m.chat, 'Enter text1 dan text2\n\nExample: .sadlogo Whatsapp|Bug')
   conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://melcanz.com/sadboy?nama=${response[0]}&nama2=${response[1]}&apikey=dUtJxxvp`
  msgsz.sendFile(m.chat, res, 'sadboy.jpg', mainfooter, m, false)
}
handler.help1 = ['sadlogo'].map(v => v + ' <text|text>')
handler.help = ['𝚂𝙰𝙳𝙻𝙾𝙶𝙾'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(sadlogo)$/i

module.exports = handler
