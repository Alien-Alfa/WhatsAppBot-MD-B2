const { webp2png } = require('../lib/webp2mp4')
const fetch = require("node-fetch");
const { sticker } = require('../lib/sticker')
let handler = async (m, { msgsz, args, usedPrefix, command }) => {
    if (!args[0]) throw `${nolink}\n\nExample:\n${usedPrefix + command} https://t.me/addstickers/namapack`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `URL Invalid`
    try {
    let packName = args[0].replace("https://t.me/addstickers/", "")
    let gas = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    if (!gas.ok) throw conn.reply(m.chat, eror)
    let json = await gas.json()
    conn.reply(m.chat, `*Total stickers:* ${json.result.stickers.length}
*Estimated Time To complete:* ${json.result.stickers.length * 2 } seconds`.trim())
    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id
        let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        let stiker = await sticker(false, "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path)
        let sel = await webp2png(stiker)
        await msgsz.sendStimg(m.chat, sel, null, { packname: global.packname, author: global.author})
        await delay(500)
    }
    conn.reply(m.chat, '_*Completed*_')
        } catch {
            conn.reply(m.chat, eror)
            }
}
handler.help1 = ['sᴛɪᴄᴋᴇʀᴛᴇʟᴇ <ᴜʀʟ>']
handler.help = ['𝚂𝚃𝙸𝙲𝙺𝚃𝙴𝙻𝙴']
handler.tags = ['sticker']
handler.command = /^stictele$/i

//

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
