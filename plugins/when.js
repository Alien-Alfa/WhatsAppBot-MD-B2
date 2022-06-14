let handler = async (m, { msgsz, text }) => {
	if (!text) throw false
    msgsz.reply(m.chat, `
*ǫᴜᴇsᴛɪᴏɴ:* ${m.text}
*ᴀɴsᴡᴇʀ:* ${Math.floor(Math.random() * 10)} ${pickRandom(['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century'])} again ...
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {})
}
handler.help1 = ['ᴡʜᴇɴ <ᴛᴇxᴛ>?']
handler.help = ['𝚆𝙷𝙴𝙽']
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^when?$/i

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

