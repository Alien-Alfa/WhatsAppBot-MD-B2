const { toAudio, toPTT } = require('../lib/converter')

let handler = async (m, { msgsz, usedPrefix, command    }) => {
 try {   let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (/mp3|a(udio)?$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Reply video/audio with command *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media can\'t be downloaded'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Failed to perform conversion.'
    await msgsz.sendFile(m.chat, audio.data, 'file.mp3', '', m, 0, { mimetype: 'audio/mp4', asDocument: true })
  }
  if (/vn|ptt$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Reply video/audio with command *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media can\'t be downloaded'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Failed to convert.'
    await msgsz.sendFile(m.chat, audio.data, 'file.mp4', '', m, 1, { mimetype: 'audio/mp4' })
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

    handler.help1 = ['ᴍᴘ3', 'ᴠɴ']

handler.help = ['𝙼𝙿𝟹']
handler.help = ['𝚅𝙽']
handler.tags = ['audio']
handler.command = /^(mp3|a(udio)?|vn|ptt)$/i

module.exports = handler
