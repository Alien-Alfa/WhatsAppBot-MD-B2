let handler = async(m, { msgsz, text, command    }) => {
 try {   try {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.quoted.sender ? m.quoted.sender : m.sender
  let bio = await msgsz.fetchStatus(who)
  msgsz.reply(m.chat, bio.status)
  } catch {
    if (text) throw `bio is private!`
    else try {
    let who = m.quoted ? m.quoted.sender : m.sender
    let bio = await msgsz.fetchStatus(who)
    msgsz.reply(m.chat, bio.status)
  } catch {
    throw `bio is private!`
    }
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

    handler.help1 = ['ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇᴘʟʏ>']

handler.help = ['𝙶𝙴𝚃𝙱𝙸𝙾']
handler.tags = ['tools']
handler.command = /^(get)?bio$/i

module.exports = handler
