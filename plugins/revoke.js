let handler = async (m, { isAdmin, isOwner, msgsz }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
  msgsz.groupRevokeInvite(m.chat)
  msgsz.reply(m.chat, `Successfully resetted group link, link has been sent to private chat`, m)
  await delay(1000)
  msgsz.reply(m.sender, 'https://chat.whatsapp.com/' + msgsz.groupInviteCode(m.chat), m)
}
handler.help1 = ['ʀᴇᴠᴏᴋᴇ']
handler.help = ['𝚁𝙴𝚅𝙾𝙺𝙴']
handler.tags = ['group']
handler.command = /^revoke?$/i

handler.group = true
handler.botAdmin = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
