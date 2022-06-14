let handler = async(m, { msgsz, usedPrefix, text    }) => {
 try {     let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    msgsz.sendB(m.chat, `*AFK MODE*\n\n${msgsz.getName(m.sender)} now AFK${text ? ': ' + text : ''}`, wm, null, [[`Menu`, `${usedPrefix}menu`]], m)
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

    handler.help1 = ['ᴀғᴋ [ʀᴇᴀsᴏɴ]']
handler.help = ['𝙰𝙵𝙺']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler
