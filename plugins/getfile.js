let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { msgsz, isROwner, usedPrefix, command, text }) => {
if (!text) throw `uhm.. where's the filename\n\nExample \n${usedPrefix + command} main`
    conn.reply(m.chat, 'Executing...')
    let o
    try {
        o = await exec('type ' + text)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.reply(m.chat, stdout)
        if (stderr.trim()) conn.reply(m.chat, stderr)
    }
}

handler.help1 = ['ɢᴇᴛғɪʟᴇ'].map(v => v + ' <ᴛᴇxᴛ>')

handler.help = ['𝙶𝙴𝚃𝙵𝙸𝙻𝙴'].map(v => v + '')
handler.tags = ['host']
handler.command = /^(getfile|gf)$/i

handler.owner = true

module.exports = handler
