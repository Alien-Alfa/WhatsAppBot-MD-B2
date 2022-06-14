let handler = async(m, { msgsz, usedPrefix, command, args    }) => {
 try { var fetch = require('node-fetch')
  var axios = require('axios')
  if(!args[0]) throw `${nolink}`
  let capt = wm
  try {
  let full = /f$/i.test(command)
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await(await fetch(API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).buffer()
  await msgsz.sendFile(m.chat, ss, 'ss.png', capt, m, 0, {jpegThumbnail: ss})
  } catch {
  try {
  let ss1 = await(await fetch(`https://mnazria.herokuapp.com/api/screenshotweb?url=${args[0]}`)).buffer()
  await msgsz.sendFile(m.chat, ss1, 'ss.png', capt, m, 0, { jpegThumbnail: ss1})
  } catch {
  try { 
  let res = await(await fetch(`https://mnazria.herokuapp.com/api/screenshotweb?url=${args[0]}`)).json()
  let ss2 = await(await fetch(res.gambar)).buffer()
  await msgsz.sendFile(m.chat, ss2, 'ss.png', m, 0, { jpegThumbnail: ss2})
  } catch {
  try { 
  let ss3 = await(await fetch(`https://hardianto.xyz/api/tools/ssweb?url=${args[0]}&apikey=hardianto`)).buffer()
  await msgsz.sendFile(m.chat, ss3, 'ss.png', m, 0, {jpegThumbnail: ss3})
  } catch {
    let er = await msgsz.trans(lang, eror).catch(async _ => await msgsz.trans2(lang, eror))
    return msgsz.reply(m.chat, er)
         //https://hardianto.xyz/api/tools/ssweb?url=https://xnxx.com&apikey=hardianto
        }
      }
    }
  }
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

    handler.help1 = ['ssᴡᴇʙ']
handler.help = ['𝚂𝚂𝚆𝙴𝙱']
handler.tags = ['internet']
handler.command = /^ssweb$/i

module.exports = handler
