let handler = async(m, { msgsz, command, text }) => {
if (!text) throw `Enter the anime!`
  conn.reply(m.chat, wait)
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/anime', { q: text }))
  if (!res.ok) throw `${command} *${text}* not found!` //await res.text()
  let json = await res.json()
  let { title, synopsis, episodes, url, rated, score, image_url } = json.results[0]
  let ingfonya = `✨️ *Title:* ${title}
 *Episodes:* ${episodes}
 *Rating:* ${rated}
 *Score:* ${score}
 *Synopsis:* ${synopsis}
`.trim()
msgsz.sendTBI(m.chat, ingfonya, wm, image_url, `URL Info ${text}`, `${url}`, null ,null, null, null, m)
} 
handler.help1 = ['ᴀɴɪᴍᴇɪɴғᴏ <ǫᴜᴇʀʏ>']
handler.help = ['𝙰𝙽𝙸𝙼𝙴𝙸𝙽𝙵𝙾']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i

handler.register = true 

module.exports = handler
