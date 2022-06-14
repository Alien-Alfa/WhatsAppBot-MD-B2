let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ')
  if (!args[0]) throw 'Enter text\nExample: .logo1 Wizard'
   conn.reply(m.chat, '*Wait a minute⏳*\nProcessing ⚙️...')
  let res = `https://caliphapi.com/api/kaneki?text=${response}&apikey=9AmAiNPq`
  msgsz.sendFile(m.chat, res, 'kaneki.jpg', mainfooter, m, false)
}
handler.help1 = ['logo1'].map(v => v + ' <teks>')
handler.help = ['𝙻𝙾𝙶𝙾𝟷'].map(v => v + ' ')
handler.tags = ['maker']
handler.command = /^(logo1)$/i
handler.limit = true
handler.register = false

module.exports = handler
