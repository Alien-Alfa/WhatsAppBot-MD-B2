let handler = async (m, { usedPrefix, command, msgsz, text }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `*Current database  ${totalreg} user*\n*Register registered ${rtotalreg} user*`
    await msgsz.sendBI(m.chat, kon, wm, fla + `${command}`, [['Menu', `${usedPrefix}menu`]], m)
}
handler.help1 = ['ᴜsᴇʀ']

handler.help = ['𝚄𝚂𝙴𝚁']
handler.tags = ['info']
handler.command = /^(database|user)$/i

module.exports = handler
