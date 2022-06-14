let handler = async(m, { isOwner, isAdmin, msgsz, text }) => {
let name = await msgsz.getName(m.sender)
if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
  let teksnya = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
  var hid = await msgsz.groupMetadata(m.chat)
  msgsz.sendMessage(m.chat, { text: teksnya, mentions: hid.participants.map(a => a.id) })//, {quoted: fkonn})
}
handler.help1 = ['ᴛᴀɢ <ᴍᴇssᴀɢᴇ>']

handler.help = ['𝚃𝙰𝙶']
handler.tags = ['group']
handler.command = /^(h(ide?tag)?|pengumuman|announce?(d)?)$/i

handler.group = true

module.exports = handler
  
