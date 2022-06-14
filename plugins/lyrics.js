let fetch = require('node-fetch')
let handler = async (m, { text, msgsz }) => {
  if(!text) throw `Enter title`
  let res = await fetch(global.API('https://some-random-api.ml', '/lyrics', { title: text }))
  if (!res.ok) throw `lyric not found`
  let json = await res.json()
  if (!json.thumbnail.genius) throw conn.reply(m.chat, `
*${json.title}*

_${json.author}_

${json.lyrics}

${json.links.genius}
`)
  msgsz.sendMedia(m.chat, json.thumbnail.genius, m, {caption: `

*${json.title}*

_${json.author}_

${json.lyrics}

${json.links.genius}
`, jpegThumbnail: await(await fetch(json.thumbnail.genius)).buffer()})
}
handler.help1 = ['ʟʏʀɪᴄs'].map(v => v + ' <ᴛᴇxᴛ>')
handler.help = ['𝙻𝚈𝚁𝙸𝙲𝚂'].map(v => v + ' ')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
