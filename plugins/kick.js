let handler = async (m, { text, msgsz, isOwner, isAdmin, args }) => {
 if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
  let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  if(m.quoted){
if(m.quoted.sender === ownerGroup || m.quoted.sender === msgsz.user.jid) return;
let usr = m.quoted.sender;
await sock.groupParticipantsUpdate(
  m.chat, 
  [usr],
  "remove" // replace this parameter with "remove", "demote" or "promote"
)
//msgsz.groupRemove(m.chat, [usr]); return;
} 
  if(!text && !m.quoted) return msgsz.reply(m.chat, `tag yang mau dikick`, m) 
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(msgsz.user.jid)))
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await sock.groupParticipantsUpdate(
    m.chat, 
    [user],
    "remove" // replace this parameter with "remove", "demote" or "promote"
)
 // await msgsz.groupRemove(m.chat, [user])
}


handler.help1 = ['ᴋɪᴄᴋ @ᴜsᴇʀ']
handler.help = ['𝙺𝙸𝙲𝙺']
handler.tags = ['admin']
handler.command = /^(kic?k|remove|tendang|\-)$/i

handler.group = true
handler.botAdmin = true

//module.exports = handler
