let fetch = require('node-fetch')
let handler = async (m, { msgsz }) => {
  let res = await fetch('https://api.waifu.pics/sfw/megumin')
  if (!res.ok) throw 'Error !! Website is down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  msgsz.sendFile(m.chat, json.url, '', 'my wife', m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help1 = ['megumin']
handler.help = ['𝙼𝙴𝙶𝚄𝙼𝙸𝙽']
handler.tags = ['anime']
handler.command = /^(megumin)$/i

handler.limit = true

module.exports = handler
