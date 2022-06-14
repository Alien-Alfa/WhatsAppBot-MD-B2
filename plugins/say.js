let handler = async (m, { msgsz, text, usedPrefix, command    }) => {
 try {   if (!text) throw `No Text Found\n\nExample:\n${usedPrefix + command} Hello`
    msgsz.reply(m.chat, text, null)
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

    handler.help1 = ['say <ᴛᴇxᴛ>']
handler.help = ['𝚂𝙰𝚈']
handler.tags = ['tools']
handler.command = /^(say)$/i

module.exports = handler
