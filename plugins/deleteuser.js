let handler = async (m, { msgsz, usedPrefix, command, text }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

	text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }

  if(!text && !m.quoted) return msgsz.reply(m.chat, `Which number?\nExample: *${usedPrefix}${command} ${global.owner[0]}*\n@tag/reply user`, m)
  //let exists = await msgsz.isOnWhatsApp(number)
  // if (exists) return msgsz.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return msgsz.reply(m.chat, `The number you entered is invalid!`, m)
  if(number.length > 15) return msgsz.reply(m.chat, `The number you entered is invalid!`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
	let groupMetadata = m.isGroup ? await msgsz.groupMetadata(m.chat) : {}
        let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == user) : {}
	let number = user.split('@')[0]
	delete global.db.data.users[user]
        let pp = await msgsz.profilePictureUrl(number+'@s.whatsapp.net', 'image').catch((_) => "https://raw.githubusercontent.com/Alien-alfa/Alien-alfa/beta/MD-Images/CONTACT-IMG/R-B.jpg")
        let anu = `Deleted successfully @${number} from *DATABASE*`
 	msgsz.sendBI(m.chat, anu, wm, pp, [[`Database`,`${usedPrefix}database`]], m, {mentions: [number+'@s.whatsapp.net']})
  }
}
handler.help1= ['ᴅᴇʟᴇᴛᴇᴜsᴇʀ']

handler.help = ['𝙳𝙴𝙻𝙴𝚃𝙴𝚄𝚂𝙴𝚁']
handler.tags = ['owner']
handler.command = /^(d(el)?(ete)?u(ser)?|ha?pu?su(ser)?)$/i

handler.rowner = true

module.exports = handler
