let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ')
  if (!args[0]) throw 'Enter Text'
  conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `https://caliphapi.com/api/rem?text=${response}&text2=Elyas&apikey=9AmAiNPq`
  msgsz.sendFile(m.chat, res, 'kaneki.jpg', mainfooter, m, false)
}
handler.help1 = ['logo4'].map(v => v + ' <teks>')
handler.help = ['𝙻𝙾𝙶𝙾𝟺'].map(v => v + ' ')
handler.tags = ['maker']
handler.command = /^(logo4)$/i
handler.limit = true
handler.register = false

module.exports = handler
