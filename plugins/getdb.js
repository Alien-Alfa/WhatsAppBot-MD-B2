let handler  = async (m, { msgsz, text }) => {
msgsz.reply(m.chat, 'Wait a moment, processing database.json', m)
msgsz.sendMedia(m.chat, 'database.json', m, {fileName: 'database.json'})
}
handler.help1 = ['ɢᴇᴛᴅᴀᴛᴀʙᴀsᴇ']

handler.help = ['𝙶𝙴𝚃𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴']
handler.tags = ['host']
handler.command = /^(g(et)?d(ata)?b(ase)?)$/i

handler.rowner = true

module.exports = handler
