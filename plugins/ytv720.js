let xfar = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async (m, { msgsz, command, text }) => {
    if (!text) throw 'No Link Found\n\nEXAMPLE: .ytvHD https://youtube.com/gsjaksjdka'
  let res = await xfar.Youtube(text)
conn.reply(m.chat, global.process)
msgsz.sendFile(m.chat,res.medias[2].url, '', 'HD Youtube Downloader \n\n```if its still blurry, it means the video is blurry from youtube```', m)

}
handler.help1 = ['ytv720 <url>']
handler.help = ['𝚈𝚃𝚅𝙷𝙳']
handler.tags = ['internet']
handler.command = /^ytvHD$/i


module.exports = handler
