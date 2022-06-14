let handler = async (m) => {
    let { performance } = require('perf_hooks')
    let old = performance.now()
    await conn.reply(m.chat, '_Testing ping..._')
    let neww = performance.now()
    let speed = neww - old
    y = Math.ceil(speed)
    conn.reply(m.chat, `*ᴘɪɴɢ>>* ${y} Ms`)
}
handler.help1 = ['ᴘɪɴɢ']
handler.help = ['𝙿𝙸𝙽𝙶']
handler.tags = ['info']

handler.command = /^(ping)$/i
module.exports = handler
