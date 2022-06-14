let handler = async (m, { isOwner, isAdmin, msgsz, text, participants    }) => {
 try { if (!(isAdmin || isOwner)) {
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
catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['ᴛᴀɢᴀʟʟ <ᴍᴇssᴀɢᴇ>']
handler.help = ['𝚃𝙰𝙶𝙰𝙻𝙻']
handler.tags = ['group']
handler.command = /^tagall$/i

handler.group = true

module.exports = handler
