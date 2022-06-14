const { createHash } = require('crypto')
let handler = async (m, { msgsz, isGroup, isRegister }) => {
    let sn = createHash('md5').update(m.sender).digest('hex')
    if(m.isGroup) conn.reply(m.chat, `*SN* has been sent to private chat`)
    msgsz.reply(m.sender, `${sn}`)
}
handler.help1 = ['sn']
handler.tags = ['xp']
handler.command = /^((cek)?sn(cek)?)$/i

handler.register = true

module.exports = handler
