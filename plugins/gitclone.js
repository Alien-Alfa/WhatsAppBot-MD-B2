let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {

    if (!args[0]) throw 'Where is the github link? example: https://github.com/Alien-Alfa/whatsapp-bot-md'

    if (!regex.test(args[0])) throw 'No link found!'

    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    // 'attachment; filename=Nurutomo-wabot-aq-v2.5.1-251-g836cccd.zip'
    conn.reply(m.chat, `**Please wait, sending repository..**`)
    msgsz.sendFile(m.chat, url, filename, null, m)

}
handler.help1 = ['gitclone <url>']

handler.help = ['𝙶𝙸𝚃𝙲𝙻𝙾𝙽𝙴']
handler.tags = ['github']
handler.command = /gitclone/i

handler.limit = true

module.exports = handler
