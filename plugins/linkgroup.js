let handler = async (m, { msgsz }) => {
    try {
    msgsz.reply(m.chat, `*Group Link :* ${await msgsz.getName(m.chat)}\n\nhttps://chat.whatsapp.com/` + await msgsz.groupInviteCode(m.chat) + `\n\n${msgsz.user.name}`, m)
  } catch {
      msgsz.reply(m.chat, `Make @${msgsz.user.jid.split('@')[0]} an admin to use this command!`, m, {mentions: [msgsz.user.jid]})
 }
}
handler.help1 = ['ɪɴᴠɪᴛᴇ']
handler.help = ['𝙸𝙽𝚅𝙸𝚃𝙴']
handler.tags = ['group']
handler.command = /^invite$/i
  
handler.group = true
//handler.botAdmin = true
  
module.exports = handler
