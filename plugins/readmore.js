let handler = async (m, { msgsz, text }) => {
  let [ l, r ] = text.split`|`
  if (!l) l = ''
  if (!r) r = ''
  msgsz.reply(m.chat, l + readMore + r, m)
}
handler.help1 = ['ʀᴇᴀᴅᴍᴏʀᴇ'].map(v => v + ' <ᴛᴇxᴛ>|<ᴛᴇxᴛ>')
handler.help = ['𝚁𝙴𝙰𝙳𝙼𝙾𝚁𝙴'].map(v => v + ' ')
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|(read)?more|rm|selengkapnya)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
