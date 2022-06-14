/* Copyright (C) 2022 Neeraj Krishna.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/



let handler = async (m, { msgsz, usedPrefix, command }) => {
    try {
let res = await fetch('https://raw.githubusercontent.com/irwanx/db/master/kpop/blekping.txt')
    let txt = await res.text()
    let arr = txt.split('\n')
    let cita = arr[Math.floor(Math.random() * arr.length)]
    await msgsz.sendBI(m.chat, `Here is your Blink @${m.sender.split(`@`)[0]}`, wm, cita, [[`Next`, `${usedPrefix}${command}`]], m, {jpegThumbnail: await(await fetch(cita)).buffer(), mentions: [m.sender] })
     } catch(e){
        msgsz.reply(m.chat, `${e}`) 
      msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
      '```COMMAND   :```'+`\`\`\` ${command}\`\`\`\n`+
      '```PREFIX    :```'+`\`\`\` ${usedPrefix}\`\`\`\n`+
      '```VERSION   :```'+`\`\`\` ${version}\`\`\`\n`+
      '```ERROR     :```'+`\`\`\` ${e}\`\`\`\n\n`+
      '```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
        msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
        𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
      }}
    handler.tags = ['random']
    handler.help = ['blackpink']
    handler.command = /^(bla?e?c?kpink|bp)$/i

    handler.limit = true

    module.exports = handler
    
    //by rasel:v 