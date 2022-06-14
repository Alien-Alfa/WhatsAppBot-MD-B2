let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { msgsz, isROwner, usedPrefix, command, text    }) => {
 try { if (!text) throw `uhm.. where's the filename\n\nExample \n${usedPrefix + command} main`
    msgsz.reply(m.chat, 'Executing...')
    let o
    try {
        o = await exec('type ' + text)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) msgsz.reply(m.chat, stdout)
        if (stderr.trim()) msgsz.reply(m.chat, stderr)
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

    handler.help1 = ['ɢᴇᴛғɪʟᴇ'].map(v => v + ' <ᴛᴇxᴛ>')

handler.help = ['𝙶𝙴𝚃𝙵𝙸𝙻𝙴'].map(v => v + '')
handler.tags = ['host']
handler.command = /^(getfile|gf)$/i

handler.owner = true

module.exports = handler
