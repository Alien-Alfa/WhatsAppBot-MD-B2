let handler = async (m, { usedPrefix, command, msgsz }) => {
   let _uptime = process.uptime() * 1000
    let uptimex = clockString(_uptime)
    let fetch = require('node-fetch')


//let res = await fetch('https://api-toxic-devil-production.up.railway.app/api/random/quote')
//let json = await res.json()




    msgsz.sendTB(m.chat, `ㅤAlien Alfa BETA2\n\n😻 I am Alive \n` + `${uptimex}`, wm, linkbuttid1, butturl1, 'ꜱᴏᴜʀᴄᴇ', 'https://github.com/Alien-alfa/WhatsAppBot-MD', 'ʟɪꜱᴛ ᴍᴇɴᴜ', `.melp`, 'ᴀʟʟ ᴍᴇɴᴜ', '.] bonk', null, null, m) 
  }
  handler.help1 = ['Menu']
  handler.help = ['𝙼𝙴𝙽𝚄']
  
  handler.tags = ['main']
  handler.command = /^(menu|help|list)$/i
  
  module.exports = handler



  function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['*'+h+' Hour* ', '*'+m+' Minute* ', '*'+s+' Second*'].map(v => v.toString().padStart(2, 0)).join(' ')
}