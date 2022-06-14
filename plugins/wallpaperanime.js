const fetch = require('node-fetch')

let handler = async (m, { msgsz }) => {
    try {
        let res = await fetch(global.API('xteam', '/randomimage/wpmobile', {}, 'APIKEY'))
        if (res.status != 200) throw await res.text()
        let img = await res.buffer()
        msgsz.sendFile(m.chat, img, '', mainfooter, m, false, { thumbnail: Buffer.alloc(0) })
    } catch (e) {
        throw `Apikey limit runs out or error!`
    }
}
handler.help1 = ['wallpaperanime']
handler.help = ['𝚆𝙰𝙻𝙻𝙿𝙰𝙿𝙴𝚁𝙰𝙽𝙸𝙼𝙴']
handler.tags = ['internet']
handler.command = /^(wallpaper|wp)anime$/i
handler.limit = true

module.exports = handler
