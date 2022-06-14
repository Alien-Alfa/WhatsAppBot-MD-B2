let handler = async(m, { isOwner, isAdmin, msgsz, text    }) => {
 try { let name = await msgsz.getName(m.sender)
if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, msgsz)
                throw false
                }
  let teksnya = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
  var hid = await msgsz.groupMetadata(m.chat)
  msgsz.sendMessage(m.chat, { text: teksnya, mentions: hid.participants.map(a => a.id) })//, {quoted: fkonn})
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

    handler.help1 = ['ᴛᴀɢ <ᴍᴇssᴀɢᴇ>']

handler.help = ['𝚃𝙰𝙶']
handler.tags = ['group']
handler.command = /^(h(ide?tag)?|pengumuman|announce?(d)?)$/i

handler.group = true

module.exports = handler
  
