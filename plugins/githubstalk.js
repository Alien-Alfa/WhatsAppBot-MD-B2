let fetch = require('node-fetch')

let handler = async(m, { msgsz, text }) => {

  if (!text) return msgsz.reply(m.chat, 'Harap Masukan Username', m)

  await conn.reply(m.chat, 'Searching...')
    let res = await fetch(`https://api-toxic-devil-production.up.railway.app/api/stalk/github-user?username=${text}`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.result.avatar)).buffer()
    let hasil = `*>>> ${sa} GITHUB STALK ${sb} <<<*

➸ *Bio*: ${json.result.bio}
➸ *Company*: ${json.result.company}
➸ *Email:* ${json.result.email}
➸ *Twitter:* ${json.result.twiter_username}
➸ *Repo Public:* ${json.result.public_repo}
➸ *Gists Public:* ${json.result.public_gists}
➸ *Follower:* ${json.result.follower}
➸ *Following:* ${json.result.following}
➸ *Location:* ${json.result.location}
➸ *Type:* ${json.result.Type}
`

    msgsz.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m)
}
handler.help1 = ['githubstalk'].map(v => v + ' <query>')
handler.help = ['𝙶𝙸𝚃𝙷𝚄𝙱𝚂𝚃𝙰𝙻𝙺'].map(v => v + '')

handler.tags = ['stalk']
handler.command = /^(githubstalk)$/i

module.exports = handler
