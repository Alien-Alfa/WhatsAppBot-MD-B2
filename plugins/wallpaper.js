let handler = async (m, { msgsz, usedPrefix, command, text }) => {
if(!text) return conn.reply(m.chat, `_Enter Query_`)
  let res = pickRandom(await scrape.wallpaper(text))
  let { title, type, image } = res
  let capt = `*Title:* ${title}\n*Type:* ${type}`
  await msgsz.sendBI(m.chat, capt, wm, image, [[`Next`, `${usedPrefix}${command} ${text}`]], m, {jpegThumbnail: await(await fetch(image)).buffer(), mentions:[m.sender] })
}
handler.tags = ['ᴡᴀʟʟᴘᴀᴘᴇʀ <ǫᴜᴇʀʏ>']
handler.help1 = ['internet']
handler.help = ['𝚆𝙰𝙻𝙻𝙿𝙰𝙿𝙴𝚁']
handler.command = /^(wallpaper)$/i



module.exports = handler

function pickRandom(isi) {
        return isi[Math.floor(Math.random() * isi.length)]
    }
