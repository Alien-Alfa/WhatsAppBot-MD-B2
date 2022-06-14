let xfar = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async (m, { msgsz, command, text    }) => {
 try {   if (!text) throw 'No Link Found\n\nEXAMPLE: .ytvHD https://youtube.com/gsjaksjdka'
  let res = await xfar.Youtube(text)
msgsz.reply(m.chat, global.wait)
msgsz.sendFile(m.chat,res.medias[2].url, '', 'HD Youtube Downloader \n\n```if its still blurry, it means the video is blurry from youtube```', m)

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

    handler.help1 = ['ytv720 <url>']
handler.help = ['𝚈𝚃𝚅𝙷𝙳']
handler.tags = ['internet']
handler.command = /^ytvHD$/i


module.exports = handler
