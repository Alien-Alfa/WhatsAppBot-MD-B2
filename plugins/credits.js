

let handler = async (m, { usedPrefix}) => {
let tqto = `*BIG THANKS TO*

NeeraJ-x0: 
https://github.com/Neeraj-x0
Alien-Alfa: 
https://github.com/Alien-Alfa

AND ALL WHO HELPED (CREDITS WILL BE ADDED LATER)
`
 msgsz.sendTBI(m.chat, tqto, wm, 'https://avatars.githubusercontent.com/u/64305844?v=4', `SOURCE CODE`, `https://github.com/Alien-Alfa/WhatsAppBpt-MD-BETA2`, null, null, 'Menu', `.menu`, null, null, null, null, m) 
}
   



    handler.help1 = ['credits']
handler.help = ['𝙲𝚁𝙴𝙳𝙸𝚃𝚂']

handler.tags = ['info']
handler.command = /^(credits?|thanks?to)$/i

module.exports = handler
