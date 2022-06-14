let handler  = async (m, { msgsz, text    }) => {
 try { msgsz.reply(m.chat, 'Wait a moment, processing database.json', m)
msgsz.sendMedia(m.chat, 'database.json', m, {fileName: 'database.json'})
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

    handler.help1 = ['ɢᴇᴛᴅᴀᴛᴀʙᴀsᴇ']

handler.help = ['𝙶𝙴𝚃𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴']
handler.tags = ['host']
handler.command = /^(g(et)?d(ata)?b(ase)?)$/i

handler.rowner = true

module.exports = handler
