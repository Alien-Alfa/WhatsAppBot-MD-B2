const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { msgsz, text, usedPrefix, command }) {
  try {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Example:\n*${usedPrefix + command} Alien-Alfa.1*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty (Alphanumeric)'
  if (!age) throw 'Age cannot be empty (Number)'
  age = parseInt(age)
  if (age > 70) throw 'Age too old'
  if (age < 5) throw 'Babies can type according to the bjir format, but I don\'t know if it\'s too small now it\'s epic² for sure the child is hungry :v'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let pp = await msgsz.profilePictureUrl(m.sender, 'image').catch((_) => "https://raw.githubusercontent.com/Alien-alfa/Alien-alfa/beta/MD-Images/CONTACT-IMG/R-B.jpg")
  let sn = createHash('md5').update(m.sender).digest('hex')
  msgsz.sendBI(m.chat, `
*Successful Registration*

${sa}${kki} *Info User* ${kka}
${gy} ${zc}Name${zc}   : ${name}
${gy} ${zc}Age${zc}   : ${age} tahun
${gy} ${zc}Status${zc} : Registered √
${gy} ${zc}Present${zc} : ${prems.includes(m.sender.split`@`[0]) ? '✅ Please Chat Owner for Claiming XP' : '❌ Not a premium user'}
${sb}
`.trim(), wm, pp, [[`Profile`,`${usedPrefix}profile`], [`Show SN`, `.sn`]], m) 
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

    handler.help1 = ['ʀᴇɢɪsᴛᴇʀ'].map(v => v + '<ɴᴀᴍᴇ>.<ᴀɢᴇ>')
handler.help = ['𝚁𝙴𝙶𝙸𝚂𝚃𝙴𝚁'].map(v => v + '')
handler.tags = ['xp']

handler.command = /^(reg(is(ter)?)?)$/i

module.exports = handler
