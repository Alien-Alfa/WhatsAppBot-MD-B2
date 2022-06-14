let handler = async (m) => {
  try {
    let { performance } = require('perf_hooks')
    let old = performance.now()
    await msgsz.reply('447405935355@s.whatsapp.net', `${uptime}`+'_Testing ping..._')
    let neww = performance.now()
    let speed = neww - old
    y = Math.ceil(speed)
    msgsz.reply(m.chat, `*ᴘɪɴɢ>>* ${y} Ms`)
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

    handler.help1 = ['ᴘɪɴɢ']
handler.help = ['𝙿𝙸𝙽𝙶']
handler.tags = ['info']

handler.command = /^(ping)$/i
module.exports = handler
