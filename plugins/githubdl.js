let handler = async (m, { args, usedPrefix, command    }) => {
 try { 
if (!args[0]) throw 'where is the username?'
if (!args[1]) throw 'where is the repo?'
if (!args[2]) throw 'enter branch name'
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/${args[2]}.zip`
//F
msgsz.reply(m.chat, `compressing data to file zip*`)
msgsz.sendFile( m.chat, url, `${args[1]} ${args[2]}.zip`, null, m)

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

    handler.help1 = ['githubdl']

handler.help = ['𝙶𝙸𝚃𝙷𝚄𝙱𝙳𝙻']
handler.tags = ['github']
handler.command = /githubdl/i

handler.limit = true

module.exports = handler
