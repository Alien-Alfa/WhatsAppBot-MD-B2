let handler = async (m, { msgsz, text }) => {
   let id = m.chat
    msgsz.math = msgsz.math ? msgsz.math : {}
    if (id in msgsz.math) {
      clearTimeout(msgsz.math[id][3])
      delete msgsz.math[id]
      conn.reply(m.chat, 'Hmmm...cheat?')
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
  handler.help1 = ['ᴄᴀʟᴄ <ǫᴜᴇsᴛɪᴏɴ>']
  handler.help = ['𝙲𝙰𝙻𝙲']

  handler.tags = ['tools']
  handler.command = /^(calc(ulat(e|or))?)$/i
  handler.exp = 5
  handler.register = false
  module.exports = handler