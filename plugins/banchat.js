let handler = async (m, { msgsz, isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, msgsz)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    else who = m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, msgsz)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }

  try {
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = true
    else global.db.data.users[who].banned = true
    conn.reply(m.chat,  `Succeed Ban! ${await msgsz.user.name} not active in chat ${await msgsz.getName(who) == undefined ? 'this' : await msgsz.getName(who)}.`, m)
  } catch (e) {
    throw `number does not exist in database!`
  }
}
handler.help1 = ['ʙᴀɴ']

handler.help = ['𝙱𝙰𝙽']
handler.tags = ['owner', 'group']
handler.command = /^ban(chat)?$/i

module.exports = handler
