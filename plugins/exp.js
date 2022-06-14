let handler = async (m, { msgsz    }) => {
 try {     let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let user = global.db.data.users[who]
    msgsz.reply(m.chat, `XP @${who.split(`@`)[0]} *${user.exp}*`, m, {mentions: [who]})
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

    handler.help1 = ['xᴘ <@ᴜsᴇʀ>']
handler.help = ['𝚇𝙿']

handler.tags = ['xp']
handler.command = /^(e?xp)$/i

module.exports = handler
