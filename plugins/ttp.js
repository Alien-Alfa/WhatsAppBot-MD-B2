let handler = async (m, { msgsz, text    }) => {
 try { let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '_No Text Found_'
  //let sel = global.API('xteam', '/ttp', { file: '', text: teks })
  let sel = `https://raterian.sirv.com/New%20Project.png?text.0.text=${teks}&text.0.position.y=-35%25&text.0.color=ffffff&text.0.font.family=Poppins&text.0.font.weight=800&text.0.outline.color=000000&text.0.outline.width=1`
  msgsz.sendStimg(m.chat, sel, null, {packname: packname, author: author, mentions: [m.sender]})
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

    handler.help1 = ['ᴛᴛᴘ <ᴛᴇxᴛ>']
handler.help = ['𝚃𝚃𝙿']
handler.tags = ['sticker']

handler.command = /^ttp$/i

module.exports = handler
