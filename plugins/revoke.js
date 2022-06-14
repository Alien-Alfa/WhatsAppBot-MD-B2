let handler = async (m, { isAdmin, isOwner, msgsz    }) => {
 try {   if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
  msgsz.groupRevokeInvite(m.chat)
  msgsz.reply(m.chat, `Successfully resetted group link, link has been sent to private chat`, m)
  await delay(1000)
  msgsz.reply(m.sender, 'https://chat.whatsapp.com/' + msgsz.groupInviteCode(m.chat), m)
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

    handler.help1 = ['ʀᴇᴠᴏᴋᴇ']
handler.help = ['𝚁𝙴𝚅𝙾𝙺𝙴']
handler.tags = ['group']
handler.command = /^revoke?$/i

handler.group = true
handler.botAdmin = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
