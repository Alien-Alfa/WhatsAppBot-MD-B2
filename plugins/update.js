let { execSync } = require('child_process')
let handler = async (m, { msgsz, text, isROwner    }) => {
 try { if (global.msgsz.user.jid == msgsz.user.jid) {
    let stdout = execSync('git remote set-url origin https://github.com/Alien-Alfa/WhatsApp-Bot-MD.git && git pull' + (isROwner && text ? ' ' + text : ''))
    if (isROwner) require('fs').readdirSync('plugins').map(v => global.reload('', v))
    msgsz.sendB(m.chat, stdout.toString(), wm, 0, [[`Node Test`, `$ node test`]], m)
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

    handler.help1 = ['ᴜᴘᴅᴀᴛᴇ']
handler.help = ['𝚄𝙿𝙳𝙰𝚃𝙴']
handler.tags = ['host']
handler.command = /^(update|uo?p?|uodate)$/i //sedia payung sebelum hujan meteor 

handler.rowner = true

module.exports = handler
