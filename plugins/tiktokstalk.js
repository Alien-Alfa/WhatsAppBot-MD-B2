let fetch = require('node-fetch')

let handler = async(m, { msgsz, text }) => {
  try { 

  if (!text) return msgsz.reply(m.chat, 'Harap Masukan Username', m)

  await msgsz.reply(m.chat, 'Searching...')
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
catch(e){
  msgsz.reply(m.chat, `${e}`) 
msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
'```COMMAND   :'+`${command}`+'```\n\n'+
'```PREFIX    :'+`${usedPrefix}`+'```\n\n'+
'```VERSION   :'+`${version}`+'```\n\n'+
'```ERROR     :'+`${e}`+'```\n\n'+
'```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
  msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
} } 

    handler.help1 = ['tiktokstalk'].map(v => v + ' <username>')
//handler.help = ['𝚃𝙸𝙺𝚃𝙾𝙺𝚂𝚃𝙰𝙻𝙺'].map(v => v + '')
//handler.tags = ['stalk']
//handler.command = /^(tiktokstalk)$/i

module.exports = handler
