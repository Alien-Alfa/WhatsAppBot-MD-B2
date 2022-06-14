let fetch = require('node-fetch')
let handler = async (m, { msgsz }) => {
  let res = await fetch('https://api.waifu.pics/sfw/waifu')
  if (!res.ok) throw 'Error !! Website is down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  msgsz.sendFile(m.chat, json.url, '', mainfooter, m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help1 = ['waifu']
handler.help = ['𝚆𝙰𝙸𝙵𝚄']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

handler.limit = true

module.exports = handler
