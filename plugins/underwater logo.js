/* let fetch = require('node-fetch')
let handler = async (m, { msgsz, args    }) => {
 try {    response = args.join(' ').split('|')
  if (!args[0]) throw 'Enter Text'
  msgsz.reply(m.chat, '*Wait a minute⏳*\nprocessing ⚙️...')
  let res = `http://hadi-api.herokuapp.com/api/textpro/3d-underwater-text?teks=${response[0]}&teks2=Elyas`
  msgsz.sendFile(m.chat, res, 'underwatee.jpg', mainfooter, m, false)
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

    handler.help1 = ['underwater'].map(v => v + ' <text>')
handler.help = ['𝚄𝙽𝙳𝙴𝚁𝚆𝙰𝚃𝙴𝚁'].map(v => v + '')
handler.tags = ['maker']
handler.command = /^(underwater)$/i

module.exports = handler
*/