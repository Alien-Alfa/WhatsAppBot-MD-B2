let handler = async (m, { text    }) => {
 try {   let txt = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text
  msgsz.reply(m.chat, Buffer.from(txt, 'utf-8').toString('base64'))
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

    handler.help1 = ['ʙᴀsᴇ64 <ᴛᴇxᴛ>']
handler.help = ['𝙱𝙰𝚂𝙴𝟼𝟺']

handler.tags = ['tools']
handler.command = /^base64$/i

module.exports = handler
