let handler = async (m, { msgsz, command, usedPrefix, text }) => {
  let fetch = require('node-fetch')
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
${sa}${kki} ${msgsz.user.name} ${kka}
${gy} Library : *Baileys-MD*
${gy} Language : *Javascript*
${gy} Database : *SQL*
${gy} Version : *${versibot}*
${gy} Developer : *${global.devname}*
${gy} Runtime : *${runtime}*
${gy} Prefix : *Multi Prefix ${kki} ${usedPrefix} ${kka}*
${gy} Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
${gy} User : *${usergakdaftar}*
${gy} Register : *${userdaftar}*
${sb}
`.trim()
var as = `Date :${date}\nTime : ${a} (WIB)`
 //msgsz.sendTIL(m.chat, infonyacok, as, fla + `${command}`, `Source Code`, `https://github.com/Alien-Alfa`, null, null, `Menu`, `${usedPrefix}menu`, null, null, null, null, m, 
   msgsz.sendBI(m.chat, infonyacok, as, fla + `${command}`, [[`ɢɪᴛʜᴜʙ`, `${usedPrefix}sc`], [`ᴍᴀɪɴ ᴍᴇɴᴜ`, `${usedPrefix}menu`]], m,        
           )

}
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

