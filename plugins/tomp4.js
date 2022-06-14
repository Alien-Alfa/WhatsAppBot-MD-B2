let { webp2mp4 } = require('../lib/webp2mp4')

let handler = async (m, { msgsz, usedPrefix, command    }) => {
 try { if (!m.quoted) throw `Reply sticker with command *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `Reply sticker with command *${usedPrefix + command}*`
  if (/to(mp4|vid(eo)?)$/i.test(command)) {
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2mp4(media)
  }
  msgsz.sendMedia(m.chat, out, m, { caption: wm})
    }
  if (/togif$/i.test(command)) {
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2mp4(media)
  }
  msgsz.sendMedia(m.chat, out, m, { gifPlayback: true, caption: wm})
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

    handler.help1 = ['ᴠɪᴅᴇᴏ', 'ɢɪғ'].map(v=> v + " <ʀᴇᴘʟʏ>")
handler.help = ['𝚅𝙸𝙳𝙴𝙾'].map(v=> v + " ")
handler.help = ['𝙶𝙸𝙵'].map(v=> v + "")
handler.tags = ['tools']
handler.command = /^to(mp4|gif|vid(eo)?)$/i

module.exports = handler
