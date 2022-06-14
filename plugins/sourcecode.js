
let handler = async (m, {msgsz}) => {
  try {
  msgsz.sendTBI(m.chat, `ʜᴇʏ,\n ᴛʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ʏᴏᴜʀ ɪɴᴛᴇʀᴇꜱᴛ ɪɴ ᴛʜɪꜱ ʙᴏᴛ,\n\n ᴛʜɪꜱ ʙᴏᴛ ɪꜱ ᴘᴜʙʟɪᴄ ᴀɴᴅ ᴀᴠᴀɪʟᴀʙʟᴇ ɪɴ ɢɪᴛʜᴜʙ ᴜꜱᴇ ᴛʜᴇ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴ ᴛᴏ ɢᴇᴛ ᴛʜᴇ ʀᴇᴘᴏ,\n\n ᴋᴇᴇᴘ ɪɴ ᴍɪɴᴅ ᴛʜɪꜱ ɪꜱ ᴀ ᴏɴɢᴏɪɴɢ ᴘʀᴏᴊᴇᴄᴛ ᴀɴᴅ ʏᴏᴜ ᴍɪɢʜᴛ ᴇɴᴄᴏᴜɴᴅᴇʀ ᴍᴀɴʏ ʙᴜɢꜱ ᴏɴ ᴛʜᴇ ᴡᴀʏ.\n\n  ᴀʟꜱᴏ ꜰᴏʟʟᴏᴡ ᴍᴇ ᴏɴ ɢɪᴛʜᴜʙ ᴀɴᴅ ᴏᴛʜᴇʀ ꜱᴏᴄɪᴀʟᴍᴇᴅɪᴀ ᴘʟᴀᴛꜰᴏʀᴍꜱ\n\n ᴅᴏɴ'ᴛ ꜰᴏʀɢᴇᴛ ᴛᴏ ꜱᴜʙꜱᴄʀɪʙᴇ ᴛᴏ ᴍʏ ʏᴏᴜᴛᴜʙᴇ ᴄʜᴀɴɴᴇʟ`, wm, 'https://avatars.githubusercontent.com/u/64305844?v=4', `ɢɪᴛʜᴜʙ`, `https://github.com/Alien-Alfa/WhatsAppBot-MD-BETA2`, null, null, 'ᴍᴇɴᴜ', `.menu`, `ᴄʀᴇᴅɪᴛꜱ`, '.credits', null, null, m) 
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

    handler.help1 = ['sᴏᴜʀᴄᴇᴄᴏᴅᴇ','ɢɪᴛ']
handler.help = ['𝙶𝙸𝚃']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode|git)$/i

module.exports = handler

