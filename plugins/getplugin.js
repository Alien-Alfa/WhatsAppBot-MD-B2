let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `Enter plugin name?\n\nExample:\n${usedPrefix + command} menu`
    if (!ar1.includes(text)) return conn.reply(m.chat, `'${text}' not found!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
    conn.reply(m.chat, require('fs').readFileSync('./plugins/' + text + '.js', 'utf-8'))
}
handler.help1 = ['ɢᴇᴛᴘʟᴜɢɪɴ'].map(v => v + ' <ᴛᴇxᴛ>')

handler.help = ['𝙶𝙴𝚃𝙿𝙻𝚄𝙶𝙸𝙽'].map(v => v + ' ')
handler.tags = ['host']
handler.command = /^(getplugin|gp)$/i

handler.rowner = true 

module.exports = handler
