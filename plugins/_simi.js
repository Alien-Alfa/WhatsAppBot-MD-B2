let fetch = require('node-fetch')
let handler = m => m

handler.before = async (m) => {
    try {
    let chat = global.db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
let res = await fetch(global.API('https://api-toxic-devil.herokuapp.com', '/api/ai/simi/', { text: encodeURIComponent(m.text), lang: "en" }))
if (!res.ok) throw msgsz.reply(m.chat, eror, m )
let json = await res.json()
if (json.status == true) return await  msgsz.reply(m.chat, json.response)
else throw global.eror
        return !0
    }
    return true
}catch(e){
    msgsz.reply(m.chat, `${e}`) 
  msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
  '```COMMAND   :```'+`\`\`\` ${command}\`\`\`\n`+
  '```PREFIX    :```'+`\`\`\` ${usedPrefix}\`\`\`\n`+
  '```VERSION   :```'+`\`\`\` ${version}\`\`\`\n`+
  '```ERROR     :```'+`\`\`\` ${e}\`\`\`\n\n`+
  '```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
    msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
    𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
  }}
module.exports = handler