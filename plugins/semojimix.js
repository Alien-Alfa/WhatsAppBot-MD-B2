let handler = async (m, { msgsz, usedPrefix, command, text }) => {
  if(!text) throw `Example : *${usedPrefix + command} 🥵+🥶*`
  try {
  var [emoji1, emoji2] = text.split`+`
  //rs = encodeURIComponent(emoji1+emoji2)



  //let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)

  var rs = emoji1+emoji2
  var ras = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=`+emoji1+`_`+emoji2)
  var sl = await ras.json()
  var sel = sl.results.url
  //var ras = await axios.get(`https://api.neoxr.eu.org/api/emoji?q=${rs}&apikey=yourkey`)
  //var sel = await ras.data.data.url
  msgsz.sendStimg(m.chat, sel, m, { packname: packname, author: author })
    } catch {
    conn.reply(m.chat, 'emoji does not support, please change one of the emoji or change the position of the emoji!')  
  }
}
handler.help1 = ['ᴇᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>']
handler.help = ['𝙴𝙼𝙸𝚇']

handler.tags = ['sticker']
handler.command = /^emix$/i

module.exports = handler
