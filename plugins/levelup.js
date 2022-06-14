let fetch = require('node-fetch')
let levelling = require('../lib/levelling')

let handler = async (m, { msgsz, usedPrefix    }) => {
 try { let pp = 'https://telegra.ph/file/e891ab641d5d71c70d938.png'
  let who = m.sender
  let name = msgsz.getName(m.sender)
  let discriminator = who.substring(9, 13)
  try {
    pp = await msgsz.profilePictureUrl(who, 'image')
  } catch (e) {
  } finally {
    let user = global.db.data.users[m.sender]
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return { ...value, jid: key }
    })
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let usersLevel = sortedLevel.map(enumGetKey)
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
        {
          await msgsz.sendBI(m.chat, `${sa}${kki} To Level Up ${kka}\n${gy} Name: *${name}*\n${gy} Level: *${user.level}*\n${gy} XP: ( *${user.exp - min}/${xp}* )\n${gy} Less *${max - user.exp}* XP is leveling up again!\n${sb}`.trim(), wm, pp, [['On Autolevelup', `${usedPrefix}on autolevelup`]], m)
        }
    }
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        {
          await msgsz.sendBI(m.chat, `${sa}${kki} Level Up ${kka}\n${gy} Nama: *${name}*\n${gy} Previous levels: *${before}*\n${gy} Current level: *${user.level}*\n${sb}\n\nThe more you interact with the *BOT* the easier it is to level up!`.trim(), wm, pp, [['Claim', `${usedPrefix}claim`]], m)
        }
    }
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

    handler.help1 = ['ʟᴇᴠᴇʟᴜᴘ']
handler.help = ['𝙻𝙴𝚅𝙴𝙻𝚄𝙿']
handler.tags = ['xp']
handler.command = /^levelup$/i

module.exports = handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
