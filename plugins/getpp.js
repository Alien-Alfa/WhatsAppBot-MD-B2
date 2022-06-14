let handler = async(m, { msgsz, command    }) => {
 try {   try {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.quoted.sender ? m.quoted.sender : m.sender
  let pp = await msgsz.profilePictureUrl(who, 'image').catch((_) => "https://raw.githubusercontent.com/Alien-alfa/Alien-alfa/beta/MD-Images/CONTACT-IMG/R-B.jpg")
  msgsz.sendMedia(m.chat, pp, m, {jpegThumbnail: await(await fetch(pp)).buffer()})
  } catch {
    let sender = m.sender
    let pp = await msgsz.profilePictureUrl(sender, 'image').catch((_) => "https://raw.githubusercontent.com/Alien-alfa/Alien-alfa/beta/MD-Images/CONTACT-IMG/R-B.jpg")
    msgsz.sendMedia(m.chat, pp, m, {jpegThumbnail: await(await fetch(pp)).buffer()})
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

    handler.help1 = ['ɢᴇᴛᴘᴘ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']

handler.help = ['𝙶𝙴𝚃𝙿𝙿']
handler.tags = ['tool']
handler.command = /^(getpp|getpic?t?|pp)$/i

module.exports = handler
