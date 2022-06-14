let handler = async (m, { msgsz, command, usedPrefix, text    }) => {
 try {   let fetch = require('node-fetch')
  let _uptime = process.uptime() * 1000
  let a = require('moment-timezone').tz('Asia/Kolkata').format('HH:mm:ss') 
  let d = new Date(new Date + 3600000)
  let locale = 'in'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  let runtime = clockString(_uptime)
  let usergakdaftar = Object.keys(global.db.data.users).length
  let userdaftar = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let infonyacok = `
${sa1}${kki1} *${botname}* ${kka1}
${gx1}
${gy2} Library : *Baileys-MD*
${gy2} Language : *Javascript*
${gy2} Database : *SQL*
${gy2} Version : *${versibot}*
${gy2} Developer : *${global.devname}*
${gy2} Runtime : *${runtime}*
${gy2} Prefix : *Multi Prefix ${kki} ${usedPrefix} ${kka}*
${gy2} Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
${gy2} User : *${usergakdaftar}*
${gy2} Register : *${userdaftar}*
${sb1}
`.trim()
var as = `Date :${date}\nTime : ${a} (WIB)`
 //msgsz.sendTIL(m.chat, infonyacok, as, fla + `${command}`, `Source Code`, `https://github.com/Alien-Alfa`, null, null, `Menu`, `${usedPrefix}menu`, null, null, null, null, m, 
   msgsz.sendBI(m.chat, infonyacok, as, fla + `${command}`, [[`ɢɪᴛʜᴜʙ`, `${usedPrefix}sc`], [`ᴍᴀɪɴ ᴍᴇɴᴜ`, `${usedPrefix}menu`]], m,        
           )

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

    handler.help1 = ['ɪɴғᴏ']

handler.help = ['𝙸𝙽𝙵𝙾']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

