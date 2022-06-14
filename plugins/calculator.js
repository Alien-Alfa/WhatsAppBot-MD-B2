let handler = async (m, { msgsz, text    }) => {
 try {    let id = m.chat
    msgsz.math = msgsz.math ? msgsz.math : {}
    if (id in msgsz.math) {
      clearTimeout(msgsz.math[id][3])
      delete msgsz.math[id]
      msgsz.reply(m.chat, 'Hmmm...cheat?')
    }
    let val = text
      .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π|pi/gi, 'Math.PI')
      .replace(/e/gi, 'Math.E')
      .replace(/\/+/g, '/')
      .replace(/\++/g, '+')
      .replace(/-+/g, '-')
    let format = val
      .replace(/Math\.PI/g, 'π')
      .replace(/Math\.E/g, 'e')
      .replace(/\//g, '÷')
      .replace(/\*×/g, '×')
    try {
      console.log(val)
      let result = (new Function('return ' + val))()
      if (!result) throw result
      msgsz.reply(m.chat, `*${format}* = _${result}_`, m)
    } catch (e) {
      if (e == undefined) throw 'What\'s in it?'
      throw 'Incorrect format, only 0-9 and Symbol -, +, *, /, ×, ÷, π, e, (, ) are supported'
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

    handler.help1 = ['ᴄᴀʟᴄ <ǫᴜᴇsᴛɪᴏɴ>']
  handler.help = ['𝙲𝙰𝙻𝙲']

  handler.tags = ['tools']
  handler.command = /^(calc(ulat(e|or))?)$/i
  handler.exp = 5
  handler.register = false
  module.exports = handler