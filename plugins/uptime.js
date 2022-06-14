let handler = async (m, { usedPrefix, command }) => {
  try { 
let _uptime = process.uptime() * 1000
let uptimex = clockString(_uptime)
msgsz.reply(m.chat, uptimex)
//msgsz.sendBI(m.chat, `${uptime}`, wm, await(await fetch(fla + `${command}`)).buffer(), [['Menu', `${usedPrefix}menu`]], m) 
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

    handler.help1 = ['runtime']
handler.help = ['𝚁𝚄𝙽𝚃𝙸𝙼𝙴']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['*'+h+' Hour* ', '*'+m+' Minute* ', '*'+s+' Second*'].map(v => v.toString().padStart(2, 0)).join(' ')
}
