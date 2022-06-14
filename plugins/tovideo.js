let { webp2mp4 } = require('../lib/webp2mp4')
let { ffmpeg } = require('../lib/converter')
let handler = async (m, { msgsz }) => {
    if (!m.quoted) throw 'Reply to sticker or audio!'
    let mime = m.quoted.mimetype || ''
    if (!/webp|audio/.test(mime)) throw 'Reply to sticker or audio!'
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2mp4(media)
    } else if (/audio/.test(mime)) {
        out = await ffmpeg(media, [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')
    }
    //await msgsz.sendFile(m.chat, out, 'out.mp4', null, m)
    await msgsz.sendMedia(m.chat, out, 'out.mp4', {jpegThumbnail: await(await fetch(thumbx)).buffer(), fileLength: fsx, caption: wm})

}
handler.help1 = ['tovideo (reply)']
handler.help = ['𝙼𝙿𝟺']
handler.tags = ['sticker']

handler.command = ['mp4']

module.exports = handler
