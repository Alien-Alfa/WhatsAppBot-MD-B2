let fetch = require('node-fetch')

let handler = async(m, { msgsz, text }) => {
  try { 

  if (!text) return msgsz.reply(m.chat, 'Please enter channel name', m)

  await msgsz.reply(m.chat, 'Searching...')
    let res = await fetch(`https://x-restapi.herokuapp.com/api/yt-stalk?username=${text}&apikey=BETA`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.thumb)).buffer()
    let hasil = `*>>> ${sa} ʏᴏᴜᴛᴜʙᴇ ꜱᴛᴀʟᴋ ${sb} <<<*

${icon} *ɴᴀᴍᴇ*: ${json.channel}
${icon} *ꜱᴜʙꜱᴄʀɪʙᴇʀ*: ${json.subscriberCount}
${icon} *ᴠᴇʀɪꜰɪᴄᴀᴛɪᴏɴ*: ${json.isVerified}
${icon} *ʟɪɴᴋ*: ${json.link}
${icon} *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ*: ${json.description}
`

    msgsz.sendFile(m.chat, thumb, 'ytstalk.jpg', hasil, m)
}
catch(e){
  msgsz.reply(m.chat, `${e}`) 



msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+'```COMMAND   :```'+`\`\`\` ${command}\`\`\`\n`+'```PREFIX    :```'+`\`\`\` ${usedPrefix}\`\`\`\n`+'```VERSION   :```'+`\`\`\` ${version}\`\`\`\n`+'```ERROR     :```'+`\`\`\` ${e}\`\`\`\n\n`+'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 



  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['ytstalk','youtubestalk'].map(v => v + ' <channel>')
handler.help = ['𝚈𝚃𝚂𝚃𝙰𝙻𝙺'].map(v => v + '')
handler.tags = ['stalk']
handler.command = /^(ytstalk|youtubestalk)$/i

module.exports = handler
