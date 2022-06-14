let handler = async(m, { msgsz, command, text    }) => {
 try { if (!text) throw `Enter the anime!`
  msgsz.reply(m.chat, wait)
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

    handler.help1 = ['ᴀɴɪᴍᴇɪɴғᴏ <ǫᴜᴇʀʏ>']
handler.help = ['𝙰𝙽𝙸𝙼𝙴𝙸𝙽𝙵𝙾']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i

handler.register = true 

module.exports = handler
