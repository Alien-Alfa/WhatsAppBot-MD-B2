let axios = require('axios')

let fetch = require('node-fetch')

let handler = async (m, { text, msgsz:fur, args }) => {
  try { 
if (!text) throw 'url/link not forund?\n\n*EXAMPLE:*\n.tinyurl https://instagram.com'

fur.reply(m.chat, await shortlink(text), m)
 
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

    handler.help1 = ['tinyurl'].map(v => v + ' <link>')
handler.help = ['𝚃𝙸𝙽𝚈𝚄𝚁𝙻'].map(v => v + '')
handler.tags = ['shortlink']
handler.command = /^tinyurl$/i

module.exports = handler

async function shortlink(url){
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''}
