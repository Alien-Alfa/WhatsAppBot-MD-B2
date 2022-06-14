/* Copyright (C) 2022 Neeraj Krishna.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/



let handler = async (m, { msgsz, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/irwanx/db/master/kpop/blekping.txt')
    let txt = await res.text()
    let arr = txt.split('\n')
    let cita = arr[Math.floor(Math.random() * arr.length)]
    await msgsz.sendBI(m.chat, `Here is your Blink @${m.sender.split(`@`)[0]}`, wm, cita, [[`Next`, `${usedPrefix}${command}`]], m, {jpegThumbnail: await(await fetch(cita)).buffer(), mentions: [m.sender] })
}
    handler.tags = ['random']
    handler.help = ['blackpink']
    handler.command = /^(bla?e?c?kpink|bp)$/i

    handler.limit = true

    module.exports = handler
    
    //by rasel:v 