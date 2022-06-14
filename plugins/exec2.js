let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { msgsz, isOwner, command, text }) => {

      let lang = db.data.users[m.sender].lang
  if (global.msgsz.user.jid != msgsz.user.jid) return
  let we = 'Please wait...'
  let wet = await msgsz.trans(lang, we).catch(async _ => await msgsz.trans2(lang, we))
  conn.reply(m.chat, wet)                                          
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) {
let a = stdout.replace(/C:/gi, '').replace(/Users/gi, 'home').replace(/rdp/gi, 'usr').replace(/Desktop/gi, 'root')
conn.reply(m.chat, a)
}
    if (stderr.trim()) {
let serr = stderr.replace(/C:/gi, '').replace(/Users/gi, 'home').replace(/rdp/gi, 'usr').replace(/Desktop/gi, 'root')
conn.reply(m.chat, serr)
}
  }
}

handler.help = ['$']
handler.tags = ['advanced']
handler.customPrefix = /^[$]/
handler.command = new RegExp
handler.rowner = true
module.exports = handler
