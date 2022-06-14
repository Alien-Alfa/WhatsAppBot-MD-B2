let handler = async (m, { text }) => {
  if (!/^https?:\/\//.test(text)) throw 'Prefix *URL* with http:// or https://'
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
    conn.reply(m.chat, txt.slice(0, 65536) + '')
  }
}
handler.help1 = [' ғᴇᴛᴄʜ', 'ɢᴇᴛ'].map(v => v + ' <ᴜʀʟ>')
handler.help = ['𝙵𝙴𝚃𝙲𝙷'].map(v => v + '')
handler.help = ['𝙶𝙴𝚃'].map(v => v + '')

handler.tags = ['internet']
handler.command = /^(fetch|get)$/i

module.exports = handler

