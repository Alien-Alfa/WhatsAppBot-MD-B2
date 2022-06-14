let handler = async(m, { msgsz }) => {
  try {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.quoted.sender ? m.quoted.sender : m.sender
  let name = await msgsz.getName(who)
  conn.reply(m.chat, name)
  } catch {
    try {
    let who = m.quoted ? m.quoted.sender : m.sender
    let name = await msgsz.getName(who)
    conn.reply(m.chat, name)
  } catch {
    throw `sorry try another one`
    }
  }
}
handler.help1 = ['ɢᴇᴛɴᴀᴍᴇ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']

handler.help = ['𝙶𝙴𝚃𝙽𝙰𝙼𝙴']
handler.tags = ['tool']
handler.command = /^(get)?name?a?$/i

module.exports = handler

