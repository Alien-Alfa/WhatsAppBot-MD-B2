let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter text1|text2\n\nexample: .logo3 Wizard|md'
  conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://caliphapi.com/api/girlneko?text=${response[0]}&text2=${response[1]}&apikey=9AmAiNPq`
  msgsz.sendFile(m.chat, res, 'nekologo.jpg', mainfooter, m, false)
}
handler.help1 = ['logo3'].map(v => v + ' <text|text>')
handler.help = ['𝙻𝙾𝙶𝙾𝟹'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(logo3)$/i

module.exports = handler
