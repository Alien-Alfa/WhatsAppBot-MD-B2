
let handler = async(m, { msgsz, text }) => {
  if(!text) throw `No Reaction Found`
  if(!m.quoted) throw `reply message!`
  msgsz.relayMessage(m.chat, { reactionMessage: {
key: {
 id: m.quoted.id,
 remoteJid: m.chat,
 fromMe: true
 },
 text: text}}, { messageId: m.id })
}
handler.help1 = ['ʀᴇᴀᴄᴛɪᴏɴ <ʀᴇᴘʟʏ>']
handler.help = ['𝚁𝙴𝙰𝙲𝚃𝙸𝙾𝙽']

handler.tags = ['tools']
handler.command = /^react$/i

module.exports = handler

