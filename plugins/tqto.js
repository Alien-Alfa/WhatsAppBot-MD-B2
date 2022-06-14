let handler = async (m, { usedPrefix}) => {
    let credit = `
    \t\t\t\t\t\t\t*THANKS TO*

    *Neeraj-x0:*
    *https://github.com/Neeraj-x0*
   
    *Toxic-Ajmal:*
    *https://github.com/Ajmal-Achu*
   
    *TOXIC-DEVIL:*
    *https://github.com/TOXIC-DEVIL*
   
    *~AND MYSELF~*

    *TOXIC ALIEN:*
    *https://github.com/Alien-alfa*
   
    `
     msgsz.sendTBI(m.chat, credit, wm, 'https://avatars.githubusercontent.com/u/64305844?v=4', `SOURCE CODE`, `https://github.com/Alien-alfa/WhatsAppBot-MD-BETA2`, null, null, 'Menu', `${usedPrefix}menu`, null, null, null, null, m) 
    }
    handler.help = ['credits']
    handler.tags = ['info']
    handler.command = /^(credits?|thanks?to)$/i
   
    module.exports = handler