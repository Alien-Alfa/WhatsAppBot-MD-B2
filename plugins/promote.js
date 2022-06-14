let handler = async (m, { text, msgsz, isOwner, isAdmin, args    }) => {
 try {   if (!(isAdmin || isOwner)) {
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
  "promote" // replace this parameter with "remove", "demote" or "promote"
)
//msgsz.groupRemove(m.chat, [usr]); return;
} 
  if(!text && !m.quoted) return msgsz.reply(m.chat, `tag yang mau di jadiin admin`, m) 
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(msgsz.user.jid)))
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await sock.groupParticipantsUpdate(
    m.chat, 
    [user],
    "promote" // replace this parameter with "remove", "demote" or "promote"
)
 // await msgsz.groupRemove(m.chat, [user])
}
   

    catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['ᴘʀᴏᴍᴏᴛᴇ @ᴜsᴇʀ']
handler.help = ['𝙿𝚁𝙾𝙼𝙾𝚃𝙴']
handler.tags = ['admin']
handler.command = /^(promote|admin|\^)$/i

handler.group = true
handler.botAdmin = true

//module.exports = handler
