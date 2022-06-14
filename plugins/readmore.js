let handler = async (m, { msgsz, text    }) => {
 try {   let [ l, r ] = text.split`|`
  if (!l) l = ''
  if (!r) r = ''
  msgsz.reply(m.chat, l + readMore + r, m)
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

    handler.help1 = ['ʀᴇᴀᴅᴍᴏʀᴇ'].map(v => v + ' <ᴛᴇxᴛ>|<ᴛᴇxᴛ>')
handler.help = ['𝚁𝙴𝙰𝙳𝙼𝙾𝚁𝙴'].map(v => v + ' ')
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|(read)?more|rm|selengkapnya)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
