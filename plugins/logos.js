let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter'
  conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://caliphapi.com/api/lolimaker?text=${response[0]}&text2=elyas&apikey=9AmAiNPq`
  msgsz.sendFile(m.chat, res, 'lolilogo.jpg', mainfooter, m, false)
}
handler.help1 = ['logo2'].map(v => v + ' <text>')
handler.help = ['𝙻𝙾𝙶𝙾𝟸'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(logo2)$/i

module.exports = handler
