let handler  = async (m, { msgsz, text }) => {
msgsz.reply(m.chat, 'Please Wait Processing Session', m)
msgsz.sendMedia(m.chat, 'session.alfa.json', m, {fileName: 'session.alfa.json'})
}
handler.help1 = ['ɢᴇᴛsᴇssɪᴏɴ']

handler.help = ['𝙶𝙴𝚃𝚂𝙴𝚂𝚂𝙸𝙾𝙽']
handler.tags = ['host']
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

handler.rowner = true

module.exports = handler
