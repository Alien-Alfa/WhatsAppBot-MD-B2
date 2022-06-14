let handler = async (m, { msgsz, text    }) => {
 try {   let cc = msgsz.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
    let teks = text ? text : cc.text
    msgsz.reply(m.chat, `_Send a broadcast message to ${chats.length} chat_\nEstimation complete ${chats.length * 1.5} second`, m)
    for (let id of chats) {
      await delay(1500)
      await msgsz.copyNForward('447405935355@s.whatsapp.net', msgsz.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : '*Broadcast*\n\n' + teks + '\n\n𓊈𒆜ＡＬＩＥＮ ＡＬＦＡ𒆜𓊉' + watermark), true).catch(_ => _)
    }
    msgsz.reply(m.chat, '𝘿𝙤𝙣𝙚 𝘽𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 𝘼𝙡𝙡 𝘾𝙝𝙖𝙩:)')
  }catch(e){
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
//  handler.help = ['broadcast', 'bc'].map(v => v + ' <text>')
 // handler.tags = ['owner']
  //handler.command = /^(broadcast|bc)$/i
  handler.owner = true
  handler.mods = false
  handler.premium = false
  handler.group = false
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = false
  
  handler.fail = null
  
  module.exports = handler
  
  const more = String.fromCharCode(8206)
  const readMore = more.repeat(4001)
  
  const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
  
  const delay = time => new Promise(res => setTimeout(res, time))