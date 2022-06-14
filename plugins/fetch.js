let handler = async (m, { text    }) => {
 try {   if (!/^https?:\/\//.test(text)) throw 'Prefix *URL* with http:// or https://'
  let _url = new URL(text)
  let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
  let res = await fetch(url)
  if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
    delete res
    throw `Content-Length: ${res.headers.get('content-length')}`
  }
  if (!/text|json/.test(res.headers.get('content-type'))) return msgsz.sendMedia(m.chat, url, m, {jpegThumbnail: await(await fetch(thumbx)).buffer(), caption: url })
  let txt = await res.buffer()
  try {
    txt = util.format(JSON.parse(txt+''))
  } catch (e) {
    txt = txt + ''
  } finally {
    msgsz.reply(m.chat, txt.slice(0, 65536) + '')
  }
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

    handler.help1 = [' ғᴇᴛᴄʜ', 'ɢᴇᴛ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝙵𝙴𝚃𝙲𝙷'].map(v => v + '')
handler.help = ['𝙶𝙴𝚃'].map(v => v + '')

handler.tags = ['internet']
handler.command = /^(fetch|get)$/i

module.exports = handler

