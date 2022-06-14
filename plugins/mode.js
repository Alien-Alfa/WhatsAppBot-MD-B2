let handler = async(m, { msgsz, usedPrefix, command    }) => {
 try {   let isPublic = command === "public";
  let self = global.opts["self"]
  if(self === !isPublic) return msgsz.sendB(m.chat, `Bye ${!isPublic ? "Self" : "Public"} from earlier ${m.sender.split("@")[0] === global.owner[0] ? "miss" : "Bang"} :v`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)
  global.opts["self"] = !isPublic
  msgsz.sendB(m.chat, `${!isPublic ? "Self" : "Public"} bot Activated!`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)    
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

    handler.help1 = ["sᴇʟғ", "ᴘᴜʙʟɪᴄ"]
handler.help = ["𝚂𝙴𝙻𝙵"]
handler.help = ["𝙿𝚄𝙱𝙻𝙸𝙲"]
handler.tags = ["owner"]
handler.command = /^(self|public)/i

handler.rowner = true 

module.exports = handler
 