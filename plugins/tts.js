let gtts = require('node-gtts')
let fs = require('fs')
let path = require('path')
const defaultLang = 'en'
let handler = async (m, { msgsz, usedPrefix, command, args }) => {
  let name = m.sender
  let text = args[0]
  let lang = args.slice(1).join('|')
  if ((args[1] || '').length !== 2) {
    lang = defaultLang
    text = args.join(' ')
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text

  let res
  try { res = await tts(text, lang) }
  catch {
    res = await tts(text)
  } finally {
  if(res) msgsz.sendFile(m.chat, res, 'tts.opus', null, m, true) 
   else return conn.reply(m.chat, `Need Text to Speak \n \nExample: *${usedPrefix}${command} Alien-Alfa*`)
  }
}
handler.help1 = ['ᴛᴛs <ᴛᴇxᴛ>|<ʟᴀɴɢ> ']
handler.help = ['𝚃𝚃𝚂']
handler.tags = ['tools']
handler.command = /^g?tts$/i
module.exports = handler

function tts(text, lang = 'en') {
  console.log(lang, text)
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath))
        fs.unlinkSync(filePath)
      })
    } catch (e) { reject(e) }
  })
}
