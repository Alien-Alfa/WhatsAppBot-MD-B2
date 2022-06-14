/* const { generateThumbnail } = require("@adiwajshing/baileys")
const { ms } = require("translate-google/languages")

let handler = async(m, { msgsz    }) => {
 try { let msg = "🎈ɴᴏ ᴄᴀʟʟs ᴏɴʟʏ ᴍᴇssᴀɢᴇ"
  let name= m.sender
  let mail = 'alienalfa.yt@gmail.com'
  let verfication = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '120363040549014341@g.us' } : {}) }, message: { contactMessage: { displayName: `${await msgsz.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
   try {
await msgsz.sendContactArray(m.chat, [
    [`${owner[0]}`, `𝗧𝝝𝗫𝗜𝗖 𝝙𝗝𝗠𝝙𝗟`,𝚃𝚎𝚊𝚖 𝙴𝚕𝚎𝚌𝚝𝚛𝚊,msg,mail],
    [`${owner[1]}`, `𝗡𝝨𝝨𝝘𝝙𝗝`,𝚃𝚎𝚊𝚖 𝙴𝚕𝚎𝚌𝚝𝚛𝚊,msg,mail],
    [`${owner[2]}`, `𝗟𝝝𝝘𝗗 𝗦𝝨𝝘`,𝚃𝚎𝚊𝚖 𝙴𝚕𝚎𝚌𝚝𝚛𝚊,msg,mail],
    [`${owner[3]}`, `𝗗-𝝨-𝝯-𝗜-𝗟`,𝚃𝚎𝚊𝚖 𝙴𝚕𝚎𝚌𝚝𝚛𝚊,msg,mail],

  ],verfication) 
   } catch {
 }
}
handler.help = ['ᴏᴡɴᴇʀ']
handler.tags = ['info']
handler.command = /^(owner)$/i

module.exports = handler

*/