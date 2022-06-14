/* let handler = async (m, { msgsz }) => {
  let lang = db.data.users[m.sender].lang
  let tot = Object.values(global.plugins).filter(p => !p.disabled).map(p => Array.isArray(p.command) ? p.command : [p.command]).length
  let total = await msgsz.trans(lang, 'Total features '+tot).catch((_) => 'Total features '+tot)
  conn.reply(m.chat, total)
}
handler.help1 = ['ғᴇᴀᴛᴜʀᴇs']
handler.help = ['𝙵𝙴𝙰𝚃𝚄𝚁𝙴𝚂']
handler.tags = ['main']
handler.command = /^features$/i

module.exports = handler */
