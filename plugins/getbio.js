let handler = async(m, { msgsz, text, command }) => {
  try {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.quoted.sender ? m.quoted.sender : m.sender
  let bio = await msgsz.fetchStatus(who)
  conn.reply(m.chat, bio.status)
  } catch {
    if (text) throw `bio is private!`
    else try {
    let who = m.quoted ? m.quoted.sender : m.sender
    let bio = await msgsz.fetchStatus(who)
    conn.reply(m.chat, bio.status)
  } catch {
    throw `bio is private!`
    }
  }
}
handler.help1 = ['ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']

handler.help = ['𝙶𝙴𝚃𝙱𝙸𝙾']
handler.tags = ['tools']
handler.command = /^(get)?bio$/i

module.exports = handler
