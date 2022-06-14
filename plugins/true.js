/* Copyright (C) 2022 Albin Thomas.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Alien Alfa Bot MD
*/

let handler  = async (m, { msgsz, text }) => {

  if (!m.quoted) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
     else who = m.quoted.sender ? m.quoted.sender : m.sender || text
    
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
  ${sa}${kki} *ᴛʀᴜᴇᴄᴀʟʟᴇʀ* ${kka} 
  ${gy} Number: ${number}
  ${gy} Name: ${name}
  ${gy} AltName: ${altname}
  ${gy} Access: ${Access}
  ${gy} Career: ${Career}
  ${gy} Country: ${Country}
  ${gy} City: ${City}
  ${gy} Prefix: ${Prefix}
  ${gy} Score: ${Score}
  ${gy} UID: ${UID}
  ${gy} Number type: ${type}
  ${gy} Timezone: ${Timezone}
  ${sb}`

  var as = `Date :${date}\nTime : ${a} (WIB)`

  msgsz.sendTBA(m.chat, result, `${as}\n`+wm, linkbuttid1, butturl1, null, null, null, null, m)
  }}}
}
handler.help1 = ['ᴛʀᴜᴇ']
handler.help = ['𝚃𝚁𝚄𝙴']
handler.tags = ['tools']
handler.command = /^true$/i
module.exports = handler
