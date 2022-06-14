let handler = async (m, { msgsz, isROwner }) => {
  try {
	if(!isROwner) throw false 
    let bot = msgsz.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `reply to the picture!`
        msgsz.updateProfilePicture(bot, img)
        msgsz.reply(m.chat, '```Success```')
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

    handler.help1 = ['sᴇᴛʙᴏᴛᴘᴘ']
handler.help = ['𝚂𝙴𝚃𝙿𝙿']
handler.tags = ['owner']
handler.command = /^(set(bot)?pp)$/i

module.exports = handler
