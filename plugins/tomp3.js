const { toAudio, toPTT } = require('../lib/converter')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (/mp3|a(udio)?$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Reply video/audio with command *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media can,t be downloaded'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Failed to perform conversion..'
    await conn.sendFile(m.chat, audio.data, 'file.mp3', '', m, 0, { mimetype: 'audio/mp4', asDocument: global.db.data.chats[m.chat].useDocument })
  }
  if (/vn|ptt$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Reply video/audio with command *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media can,t be downloaded'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Failed to convert.'
    await conn.sendFile(m.chat, audio.data, 'file.mp4', '', m, 1, { mimetype: 'audio/mp4' })
  }
}
handler.help = ['tomp3', 'tovn']
handler.tags = ['audio']
handler.command = /^to(mp3|a(udio)?|vn|ptt)$/i

module.exports = handler
