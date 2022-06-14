let axios = require('axios')

let fetch = require('node-fetch')

let handler = async (m, { text, msgsz:fur, args }) => {
if (!text) throw 'url/link not forund?\n\n*EXAMPLE:*\n.tinyurl https://instagram.com'

fur.reply(m.chat, await shortlink(text), m)
 
}

handler.help1 = ['tinyurl'].map(v => v + ' <link>')
handler.help = ['𝚃𝙸𝙽𝚈𝚄𝚁𝙻'].map(v => v + '')
handler.tags = ['shortlink']
handler.command = /^tinyurl$/i

module.exports = handler

async function shortlink(url){
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''}
