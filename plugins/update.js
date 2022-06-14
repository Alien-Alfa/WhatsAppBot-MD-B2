let { execSync } = require('child_process')
let handler = async (m, { msgsz, text, isROwner }) => {
  if (global.msgsz.user.jid == msgsz.user.jid) {
    let stdout = execSync('git remote set-url origin https://github.com/Alien-Alfa/WhatsApp-Bot-MD.git && git pull' + (isROwner && text ? ' ' + text : ''))
    if (isROwner) require('fs').readdirSync('plugins').map(v => global.reload('', v))
    msgsz.sendB(m.chat, stdout.toString(), wm, 0, [[`Node Test`, `$ node test`]], m)
  }
}
handler.help1 = ['ᴜᴘᴅᴀᴛᴇ']
handler.help = ['𝚄𝙿𝙳𝙰𝚃𝙴']
handler.tags = ['host']
handler.command = /^(update|uo?p?|uodate)$/i //sedia payung sebelum hujan meteor 

handler.rowner = true

module.exports = handler
