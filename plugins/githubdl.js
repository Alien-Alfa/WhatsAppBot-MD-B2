let handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw 'where is the username?'
if (!args[1]) throw 'where is the repo?'
if (!args[2]) throw 'enter branch name'
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/${args[2]}.zip`
//F
conn.reply(m.chat, `compressing data to file zip*`)
msgsz.sendFile( m.chat, url, `${args[1]} ${args[2]}.zip`, null, m)

}
handler.help1 = ['githubdl']

handler.help = ['𝙶𝙸𝚃𝙷𝚄𝙱𝙳𝙻']
handler.tags = ['github']
handler.command = /githubdl/i

handler.limit = true

module.exports = handler
