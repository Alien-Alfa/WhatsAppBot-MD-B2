/* let fetch = require('node-fetch')
let handler = async (m, { msgsz, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter Text'
  conn.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `http://hadi-api.herokuapp.com/api/textpro/3d-underwater-text?teks=${response[0]}&teks2=Elyas`
  msgsz.sendFile(m.chat, res, 'underwatee.jpg', mainfooter, m, false)
}
handler.help1 = ['underwater'].map(v => v + ' <text>')
handler.help = ['𝚄𝙽𝙳𝙴𝚁𝚆𝙰𝚃𝙴𝚁'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(underwater)$/i

module.exports = handler
*/