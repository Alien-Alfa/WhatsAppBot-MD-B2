/* Copyright (C) 2022 Albin Thomas.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Alien Alfa Bot MD
*/

let handler  = async (m, { msgsz, text }) => {
  try { 

  if (!m.quoted) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
     else who = m.quoted.sender ? m.quoted.sender : m.sender || args
    
  let res = await fetch(`https://neeraj-x0-api.up.railway.app/api/truecaller?q=${who.split('@')[0]}&apikey=Alien-Alfa`)
  let json = await res.json()
  
  for(let res of json.data){
  const name = `${res.name}`
  const altname = `${res.altName}`
  const Access = `${res.access}`
  const Score = `${res.score}`
  const UID = `${res.id}`
  for(let phn of res.phones){
  const number = `${phn.e164Format}`
  const type = `${phn.numberType}`
  const Career = `${phn.carrier}`
  const Country = `${phn.countryCode}`
  const Prefix = `${phn.dialingCode}`
  for(let adr of res.addresses){
  const City = `${adr.city}`
  const Timezone = `${adr.timeZone}`
  
  let a = require('moment-timezone').tz('Asia/Kolkata').format('HH:mm:ss') 
  let d = new Date(new Date + 3600000)
  let locale = 'in'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  let result = `
${sa1}${kki1} *ᴛʀᴜᴇᴄᴀʟʟᴇʀ* ${kka1}${gy1}
${gx1}
${gy2} Number: ${number}
${gy2} Name: ${name}
${gy2} AltName: ${altname}
${gy2} Access: ${Access}
${gy2} Career: ${Career}
${gy2} Country: ${Country}
${gy2} City: ${City}
${gy2} Prefix: ${Prefix}
${gy2} Score: ${Score}
${gy2} UID: ${UID}
${gy2} Number type: ${type}
${gy2} Timezone: ${Timezone}
${sb1}`.trim()

 

  msgsz.sendTBA(m.chat, result, wm, linkbuttid1, butturl1, null, null, null, null, m)
  }}}
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

    handler.help1 = ['ᴛʀᴜᴇ']
handler.help = ['𝚃𝚁𝚄𝙴']
handler.tags = ['tools']
handler.command = /^true$/i
module.exports = handler
