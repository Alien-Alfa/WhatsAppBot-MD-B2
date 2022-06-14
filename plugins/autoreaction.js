
/* Copyright (C) 2022 Neeraj Krishna.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/




let handler = async(m, { usedPrefix,command,msgsz, text }) => {
  
    msgsz.sendMessage(m.chat, {
            react: {
            text: `${pickRandom(['😈', '🥵', '😱', '🐦', '🎈','😎','😜','🤣','👀','😗','😑','😯','😛','🧐','😲','🤓','💃','🕺','🐤','🗿','🤨','🥴','👍','😔', '🚶‍♂','👎'])}`,
            key: m.key,
            }})
   
   }
      handler.customPrefix = /(sad|oh|idk|poda|eda|ni|njn|go|kundan|myr|shit|ehh|hmm|aah|ok|nop|no|way)$/i
      handler.command = new RegExp
   
      module.exports = handler
   
      function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)]
      } 