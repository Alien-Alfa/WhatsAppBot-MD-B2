let handler = async (m, { msgsz, text, usedPrefix, command    }) => {
 try {   if (!text) throw `If you find an error message, report it using this command\n\nExample:\n${usedPrefix + command} selamat siang owner, sy menemukan eror seperti berikut <copy/tag pesan erornya>`
    if (text.length < 10) throw `The report is too short, at least 10 characters!`
    if (text.length > 1000) throw `Report is too long, maximum 1000 characters!`
    let teks = `*${command.toUpperCase()}!*\n\nFrom : *@${m.sender.split`@`[0]}*\n\nMessage : ${text}\n`
    for (let i of global.owner){
    msgsz.reply(i + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })}
    msgsz.reply(m.chat, `_Message sent to bot owner, if ${command.toLowerCase()} just playing games will not be responded._`)
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

    handler.help1 = ['report', 'request'].map(v => v + ' <ᴛᴇxᴛ>')
handler.help = ['𝚁𝙴𝙿𝙾𝚁𝚃'].map(v => v + ' ')
handler.help = ['𝚁𝙴𝚀𝚄𝙴𝚂𝚃'].map(v => v + ' ')
handler.tags = ['info']
handler.command = /^(report|request)$/i
module.exports = handler
