let handler = async(m, { msgsz, command }) => {
  try {
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
handler.help1 = ['ɢᴇᴛᴘᴘ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']

handler.help = ['𝙶𝙴𝚃𝙿𝙿']
handler.tags = ['tool']
handler.command = /^(getpp|getpic?t?|pp)$/i

module.exports = handler
