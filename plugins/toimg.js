let { webp2png } = require('../lib/webp2mp4')

let handler = async (m, { msgsz, usedPrefix, command    }) => {
 try { if (!m.quoted) throw `_Reply to sticker with command_ *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `_Reply to sticker with command_ *${usedPrefix + command}*`
  try {
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2png(media)
  }
  msgsz.sendMedia(m.chat, out, m, {jpegThumbnail: await(await fetch(out)).buffer(), caption: `• Sticker to ${command} by ` + wm})
  } catch {
    throw `_Reply to non animated stickers with command_ *${usedPrefix + command}*`
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

    handler.help1 = ['ᴘʜᴏᴛᴏ']
handler.help = ['𝙿𝙷𝙾𝚃𝙾']
handler.tags = ['tools']
handler.command = /^(photo)$/i

module.exports = handler
