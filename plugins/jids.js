/* Copyright (C) 2022 Neeraj Krishna.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/
let handler = async (m, { msgsz,usedPrefix,command}) => {
        let jid 
            if (m.quoted) jid  = m.mentionedJid[0] ? m.mentionedJid[1] : m.quoted.sender
         else jid = m.chat
         msgsz.reply(m.chat,jid)

}
handler.help = ["jid"];
handler.command = /^jid?$/i


module.exports = handler