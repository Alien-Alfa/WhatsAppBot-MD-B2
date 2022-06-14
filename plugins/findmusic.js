let fs = require('fs')
let acrcloud = require('acrcloud')
let acr = new acrcloud({
	host: 'identify-eu-west-1.acrcloud.com',
	access_key: 'c816ad50a2bd6282e07b90447d93c38c',
	access_secret: 'ZpYSwmCFpRovcSQBCFCe1KArX7xt8DTkYx2XKiIP'
})

let handler = async (m) => {
	try {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/audio|video/.test(mime)) {
		let media = await q.download()
		let ext = mime.split('/')[1]
		fs.writeFileSync(`./${m.sender}.${ext}`, media)
		let res = await acr.identify(fs.readFileSync(`./${m.sender}.${ext}`))
		let { code, msg } = res.status
		if (code !== 0) throw msg
		let { title, artists, album, genres, release_date } = res.metadata.music[0]
		let txt = `
*• Title:* ${title}
*• Artist:* ${artists !== undefined ? artists.map(v => v.name).join(', ') : ''}
*• Album:* ${album.name || ''}
*• Genres:* ${genres !== undefined ? genres.map(v => v.name).join(', ') : ''}
*• Release Date:* ${release_date}
`.trim()
		fs.unlinkSync(`./${m.sender}.${ext}`)
		await msgsz.reply(m.chat, txt)
	} else throw 'Reply audio/video!'
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

    handler.help1 = ['ғɪɴᴅ <ʀᴇᴘʟʏ>']
handler.help = ['𝙵𝙸𝙽𝙳']

handler.tags = ['tools']
handler.command = /^find$/i
handler.sudo = true
module.exports = handler