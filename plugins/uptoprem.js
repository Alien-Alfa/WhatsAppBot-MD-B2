let handler = async (m, { msgsz,isOwner, isROwner, text }) => {
msgsz.sendTB(m.chat, '😻 Want to Upgrade to Premium?\n\n This Bot is Currently A Beta Test 🐥\n No premium is currently Avalable 😅', wm, 'Contact Owner', `https://wa.me/${global.owner[0]}?text=HI Bro I need Premium`, null, null, null, null, null, null, null, m)
}

handler.help1 = ['ɢᴇᴛᴘʀᴇᴍ']
handler.help = ['𝙶𝙴𝚃𝙿𝚁𝙴𝙼']
handler.tags = ['main']
handler.command = /^(getprem|prem(ium))$/i

module.exports = handler
