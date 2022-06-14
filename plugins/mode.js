let handler = async(m, { msgsz, usedPrefix, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]
  if(self === !isPublic) return msgsz.sendB(m.chat, `Bye ${!isPublic ? "Self" : "Public"} from earlier ${m.sender.split("@")[0] === global.owner[0] ? "miss" : "Bang"} :v`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)
  global.opts["self"] = !isPublic
  msgsz.sendB(m.chat, `${!isPublic ? "Self" : "Public"} bot Activated!`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)    
}
handler.help1 = ["sᴇʟғ", "ᴘᴜʙʟɪᴄ"]
handler.help = ["𝚂𝙴𝙻𝙵"]
handler.help = ["𝙿𝚄𝙱𝙻𝙸𝙲"]
handler.tags = ["owner"]
handler.command = /^(self|public)/i

handler.rowner = true 

module.exports = handler
 