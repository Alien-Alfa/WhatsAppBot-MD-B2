let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Where is the url/link?'
  let res = await fetch(`http://hadi-api.herokuapp.com/api/shorturl?url=${text}`)
  let json = await res.json()
  if (json.status) conn.reply(m.chat, json.result)
  else throw 'Link Invalid!\nPlease check the given url'
}
handler.help1 = ['shorturl'].map(v => v + ' <url>')
handler.help = ['𝚂𝙷𝙾𝚁𝚃𝚄𝚁𝙻']
handler.tags = ['shortlink']
handler.command = /^shorturl$/i

module.exports = handler
