let handler = async (m, { usedPrefix, command, text    }) => {
 try {     let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `Enter plugin name?\n\nExample:\n${usedPrefix + command} menu`
    if (!ar1.includes(text)) return msgsz.reply(m.chat, `'${text}' not found!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
    msgsz.reply(m.chat, require('fs').readFileSync('./plugins/' + text + '.js', 'utf-8'))
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

    handler.help1 = ['ɢᴇᴛᴘʟᴜɢɪɴ'].map(v => v + ' <ᴛᴇxᴛ>')

handler.help = ['𝙶𝙴𝚃𝙿𝙻𝚄𝙶𝙸𝙽'].map(v => v + ' ')
handler.tags = ['host']
handler.command = /^(getplugin|gp)$/i

handler.rowner = true 

module.exports = handler
