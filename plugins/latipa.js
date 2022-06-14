let handler = async (m, { msgsz, text, usedPrefix, command, participants   }) => {

let latipaz = ['6285157559020']

    try { 






      if (text === '') {

        let teks = `${text ? text : ''}\n\n Lutipa Is Here \n`
        for (let mem of participants) {
          teks += `@${mem.id.split('@')[0]}\n`
        }
        teks += `${sb}\n\n${msgsz.user.name}`
        msgsz.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) })
      }








              if (!text) msgsz.reply(m.chat, `@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n@${latipaz} \n`)
             
              else msgsz.sendMessage(m.chat, { text: "Bonk Lutipa Is Here", mentions: `@${latipaz}` })
   
    }
   catch(e){
     msgsz.reply(m.chat, `${e}`) 
   msgsz.reply(`${global.owner[0]}`+'@s.whatsapp.net','```ERROR REPORT```\n\n'+
   '```COMMAND   :```'+`\`\`\` ${command}\`\`\`\n`+
   '```PREFIX    :```'+`\`\`\` ${usedPrefix}\`\`\`\n`+
   '```VERSION   :```'+`\`\`\` ${version}\`\`\`\n`+
   '```ERROR     :```'+`\`\`\` ${e}\`\`\`\n\n`+
   '```DETIELD ERROR LOG IN CRASH REPORT GROUP```') 
     msgsz.reply('120363041922413381@g.us', `𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}\n\n
     𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}`, null, {})
   } }
   

   handler.command = /^(latipa)$/i

   module.exports = handler