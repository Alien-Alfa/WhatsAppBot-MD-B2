let handler = async (m, { msgsz,isOwner, isROwner, text }) => {
  try { 
msgsz.sendTB(m.chat, '😻 Want to Upgrade to Premium?\n\n This Bot is Currently A Beta Test 🐥\n No premium is currently Avalable 😅', wm, 'Contact Owner', `https://wa.me/${global.owner[0]}?text=HI Bro I need Premium`, null, null, null, null, null, null, null, m)
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

    handler.help1 = ['ɢᴇᴛᴘʀᴇᴍ']
handler.help = ['𝙶𝙴𝚃𝙿𝚁𝙴𝙼']
handler.tags = ['main']
handler.command = /^(getprem|prem(ium))$/i

module.exports = handler
