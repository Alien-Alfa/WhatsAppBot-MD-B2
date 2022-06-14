let handler = async (m, { isOwner, isAdmin, msgsz, text, participants }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, msgsz)
    throw false
  }

if (text === '') {

  let teks = `${text ? text : ''}\n\n${sa}${kki}Tag All ${kka}\n`
  for (let mem of participants) {
    teks += `${gy} @${mem.id.split('@')[0]}\n`
  }
  teks += `${sb}\n\n${msgsz.user.name}`
  msgsz.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) })
}
else {

  let teks = `${sa}${kki} *ᴛᴀɢᴀʟʟ* ${kka}\n${gy} ${text}\n${sb}`

  msgsz.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) })
}
}
handler.help1 = ['ᴛᴀɢᴀʟʟ <ᴍᴇssᴀɢᴇ>']
handler.help = ['𝚃𝙰𝙶𝙰𝙻𝙻']
handler.tags = ['group']
handler.command = /^tagall$/i

handler.group = true

module.exports = handler
