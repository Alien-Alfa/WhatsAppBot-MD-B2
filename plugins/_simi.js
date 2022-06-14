let fetch = require('node-fetch')
let handler = m => m

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned && !m.isGroup) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let res = await fetch(global.API('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(m.text), lc: "en" }, ''))
        if (!res.ok) throw msgsz.reply(m.chat, eror, m )
        let json = await res.json()
        if (json.success == '🐥:') return conn.reply(m.chat, 'l l tyana')
        await conn.reply(m.chat, `${json.success}`)
        return !0
    }
    return true
}
module.exports = handler
