let handler = async (m, { msgsz, text, usedPrefix, command }) => {
    if (!text) throw `No Text Found\n\nExample:\n${usedPrefix + command} Hello`
    msgsz.reply(m.chat, text, null)
}
handler.help1 = ['say <ᴛᴇxᴛ>']
handler.help = ['𝚂𝙰𝚈']
handler.tags = ['tools']
handler.command = /^(say)$/i

module.exports = handler
