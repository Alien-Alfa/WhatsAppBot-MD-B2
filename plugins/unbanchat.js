let handler = async (m, { isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, msgsz)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    who = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, msgsz)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }
  try {
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = false
    else global.db.data.users[who].banned = false
    conn.reply(m.chat, `_${await msgsz.user.name} Active in  ${await msgsz.getName(who) == undefined ? 'this' : await msgsz.getName(who)}.`, m)

  } catch (e) {
    throw `number does not exist in the database!`
  }
}
handler.help1 = ['ᴜɴʙᴀɴ']
handler.help = ['𝚄𝙽𝙱𝙰𝙽']
handler.tags = ['owner', 'group']
handler.command = /^unban(chat)?$/i

module.exports = handler
