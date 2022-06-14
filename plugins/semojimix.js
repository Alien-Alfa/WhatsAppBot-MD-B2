let handler = async (m, { msgsz, usedPrefix, command, text    }) => {
 try { if(!text) throw `Example : *${usedPrefix + command} 🥵+🥶*`
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
    msgsz.reply(m.chat, 'emoji does not support, please change one of the emoji or change the position of the emoji!')  
  }
}
catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['ᴇᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>']
handler.help = ['𝙴𝙼𝙸𝚇']

handler.tags = ['sticker']
handler.command = /^emix$/i

module.exports = handler
