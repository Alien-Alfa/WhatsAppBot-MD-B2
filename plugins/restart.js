let handler = async (m, { msgsz, isROwner, text }) => {
  let { spawn } = require('child_process');
    if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (global.msgsz.user.jid == msgsz.user.jid) {
    await conn.reply(m.chat, '_Restarting the Bot..._')
    process.send('reset')
  } else throw '_Try again Later_'
}

handler.help1 = ['ʀᴇsᴛᴀʀᴛ']
handler.help = ['𝙳𝙴𝙱𝙾𝚄𝙽𝙲𝙴']
handler.tags = ['host']
handler.command = /^(debounce?)$/i

handler.rowner = true

module.exports = handler
