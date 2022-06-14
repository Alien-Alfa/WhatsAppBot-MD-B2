let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Where is the url/link?'
  let res = await fetch(`http://hadi-api.herokuapp.com/api/cuttly?url=${text}`)
  let json = await res.json()
  if (json.status) conn.reply(m.chat, json.result)
  else throw 'Link Invalid!\nPlease check the given url'
}
handler.help1 = ['cuttly'].map(v => v + ' <link>')

handler.help = ['𝙲𝚄𝚃𝚃𝙻𝚈'].map(v => v + '')
handler.tags = ['shortlink']
handler.command = /^cuttly$/i

module.exports = handler
