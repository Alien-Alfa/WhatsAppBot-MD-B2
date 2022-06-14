let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { msgsz, command, usedPrefix, args }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  if (!text) throw `uhm.. what are you looking for?\n\nExample:\n${usedPrefix + command} Whatsapp Web API`
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n=========================\n\n`
  try {
    await msgsz.sendMedia(m.chat, 'https://telegra.ph/file/92a008f4c1a2bfb1671e5.mp4', m, {caption: '*Google Search*\n\n*Source:* ' + url + '\n\n' + msg, gifPlayback: true, jpegThumbnail: await(await fetch('https://telegra.ph/file/62da3c5e3f4319d949705.jpg')).buffer()})
   } catch {
    throw msg
  }
}
handler.help1 = ['ɢᴏᴏɢʟᴇ'].map(v => v + ' <ǫᴜᴇʀʏ>')

handler.help = ['𝙶𝙾𝙾𝙶𝙻𝙴'].map(v => v + '')
handler.tags = ['internet']
handler.command = /^g(oogle?)?$/i

module.exports = handler

