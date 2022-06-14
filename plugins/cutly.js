let fetch = require('node-fetch')
let handler = async (m, { text    }) => {
 try {   if (!text) throw 'Where is the url/link?'
  let res = await fetch(`http://hadi-api.herokuapp.com/api/cuttly?url=${text}`)
  let json = await res.json()
  if (json.status) msgsz.reply(m.chat, json.result)
  else throw 'Link Invalid!\nPlease check the given url'
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

    handler.help1 = ['cuttly'].map(v => v + ' <link>')

handler.help = ['𝙲𝚄𝚃𝚃𝙻𝚈'].map(v => v + '')
handler.tags = ['shortlink']
handler.command = /^cuttly$/i

module.exports = handler
