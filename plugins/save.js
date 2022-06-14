let handler = async(m, { text, msgsz, usedPrefix, command }) => {
  if (/saveme|sv(me|gua|g?w|aku)$/i.test(command)) {
     msgsz.sendContact(m.chat, `${m.sender.split('@')[0]}`, `${await msgsz.getName(m.sender)}`, m)
    }
    let teks = text
  if (/savehe?s?|svshe|savedia|svdia$/i.test(command)) {
     try {
     let who
     if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
     else who = m.quoted.sender ? m.quoted.sender : m.sender
     msgsz.sendContact(m.chat, `${who.split('@')[0]}`, `${await msgsz.getName(who)}`, m)
    } catch {
      throw `@tag or reply the contact `
      }
    }
  if (/save|sv$/i.test(command)) {
     if(!text) 
          teks = msgsz.getName(who)
     try {
     let who
     if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
     else who = m.quoted.sender ? m.quoted.sender : m.sender
     msgsz.sendContact(m.chat, `${who.split('@')[0]}`, teks, m) 
  } catch {
     msgsz.sendContact(m.chat, `${m.sender.split('@')[0]}`, teks, m)
  }
 }
}
handler.help1 = ['sᴀᴠᴇ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']
handler.help = ['𝚂𝙰𝚅𝙴']
handler.tags = ['tools']
handler.command = /^save?$/i

module.exports = handler
