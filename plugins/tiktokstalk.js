let fetch = require('node-fetch')

let handler = async(m, { msgsz, text }) => {

  if (!text) return msgsz.reply(m.chat, 'Harap Masukan Username', m)

  await conn.reply(m.chat, 'Searching...')
    let res = await fetch(`https://x-restapi.herokuapp.com/api/tiktok-stalk?username=${text}&apikey=BETA`)
    let json = await res.json()
    if (res.status !== 200) throw await res.text()
    if (!json.status) throw json
    let thumb = await (await fetch(json.avatarLarger)).buffer()
    let hasil = `*>>> ${sa} TIK-TOK STALK ${sb} <<<*

${icon} *Name*: ${json.username}
${icon} *Follower*: ${json.followerCount}
${icon} *Following*: ${json.followingCount}
${icon} *Private*: ${json.isprivate}
${icon} *Id*: ${json.id}
`

    msgsz.sendFile(m.chat, thumb, 'tiktokstalk.jpg', hasil, m)
}
//handler.help1 = ['tiktokstalk'].map(v => v + ' <username>')
//handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺𝚂𝚃𝙰𝙻𝙺'].map(v => v + '')
//handler.tags = ['stalk']
//handler.command = /^(tiktokstalk)$/i

module.exports = handler
