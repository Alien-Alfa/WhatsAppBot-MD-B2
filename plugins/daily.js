const free = 500
const prem = 5000
const freelimit = 5
const premlimit = 5
let handler = async (m, { msgsz, usedPrefix, isPrems    }) => {
 try {   if (db.data.users[m.sender].level < 1) return msgsz.sendB(m.chat, `Raise your level by typing \n${usedPrefix}levelup`, wm, 0, [[`Level Up`,`${usedPrefix}levelup`]], m) 
  let time = db.data.users[m.sender].lastclaim + 86400000
  if (new Date - db.data.users[m.sender].lastclaim < 86400000) throw `You have claimed daily claim today\nwait for ${msToTime(time - new Date())} again`
  db.data.users[m.sender].limit += isPrems ? premlimit * 2 : freelimit * 1
  db.data.users[m.sender].exp += isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level
  msgsz.sendB(m.chat, `Congratulations you got *+${isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level}* XP & *+${isPrems ? premlimit * 2 : freelimit * 1 }*Limit of daily claim\n\nThe higher the level, the higher the XP you get`, wm, 0, [[`Balance`, `${usedPrefix}balance`]], m)
  db.data.users[m.sender].lastclaim = new Date * 1
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

    handler.help1 = ['ᴄʟᴀɪᴍ']
handler.help = ['𝙲𝙻𝙰𝙸𝙼']

handler.tags = ['xp']
handler.command = /^(daily|claim)$/i

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Hour " + minutes + "Minute"
}
