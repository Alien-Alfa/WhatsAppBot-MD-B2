/*let handler = async (m, { isAdmin, isOwner    }) => {
 try {   if(isOwner) throw false  
  //if (isbotAdmin) throw `w bukan admin:(`
  if (m.fromMe) throw 'No'
  if (isAdmin) throw '_Already Admin_'
  try {
  await sock.groupParticipantsUpdate(
    m.chat, 
    [m.sender],
    "promote" 
)
        } catch {
           throw msgsz.reply(m.chat, "can't")
  }
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

    handler.help1 = ['up.']
handler.help = ['𝙿𝚁𝙾𝙼𝙾𝚃𝙴']
handler.tags = ['owner']
handler.command = /^(up.|admin.|promote)$/i

handler.group = true

module.exports = handler */
