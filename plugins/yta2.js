/*let limit = 30
let fetch = require('node-fetch')

let handler = async (m, { msgsz, args, isPrems, isOwner }) => {
	if (!args || !args[0]) throw 'Uhm... whare is the link vro?'
	let chat = db.data.chats[m.chat]
	let dl_link = `https://yt-downloader.akkun3704.repl.co/?url=${args[0]}&filter=audioonly&quality=&contenttype=`
	let json = await (await fetch(`https://yt-downloader.akkun3704.repl.co/yt?url=${args[0]}`)).json()
	let res = await (await fetch(dl_link)).buffer()
	let isLimit = (isPrems || isOwner ? 99 : limit) * 1000000 < res.length
  msgsz.reply(m.chat,' ＤＯＷＮＬＯＡＤＩＮＧ...', m)
	if (!isLimit) msgsz.sendMessage(m.chat, res, chat.useDocument ? 'documentMessage' : 'audioMessage', { quoted: m, filename: json.result.videoDetails.title + '.mp3', mimetype: 'audio/mp3' })

handler.help = ['mp3', 'a'].map(v => 'yt' + v)
handler.tags = ['downloader']
handler.command = /^(yta2)$/i
handler.limit = true

module.exports = handler
*/