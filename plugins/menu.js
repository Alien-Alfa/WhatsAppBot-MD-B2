let { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let { createHash} = require('crypto')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const { default: Users } = require('node-os-utils/lib/users')
const defaultMenu = {
  before: '╭────────────────╮\n'.trimStart(),
  before1:' |                      ᴀʟɪᴇɴ ᴀʟꜰᴀ                        |\n'.trimStart(),
  before2:'╰────────────────╯\n'.trimStart(),


  header: `${sa}${kki} ${zt}%category${zt} ${kka}`,
  body: `${gz}  %cmd${zc} %islimit %isPremium`,
  footer: `${sb}\n`,
          after: ``,
}


let handler = async (m, { msgsz, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': '*MENU UTAMA*',
  'advanced': '*ADVANCED*',
  'absen': '*MENU ABSEN*',
  'anime': '*MENU ANIME*',
  'sticker': '*MENU CONVERT*',
  'downloader': '*MENU DOWNLOADER*',
  'xp': '*MENU EXP*',
  'fun': '*MENU FUN*',
  'game': '*MENU GAME*',
  'github': '*MENU GITHUB*',
  'group': '*MENU GROUP*',
  'image': '*MENU IMAGE*',
  'info': '*MENU INFO*',
  'internet': '*INTERNET*',
  'islam' : '*MENU ISLAMI*',
  'kerang': '*MENU KERANG*',
  'maker': '*MENU MAKER*',
  'owner': '*MENU OWNER*',
  'Pengubah Suara': '*PENGUBAH SUARA*',
  'premium': '*PREMIUM MENU*',
  'quotes' : '*MENU QUOTES*',
  'rpg': '*MENU RPG*',
  'stalk': '*MENU STALK*',
  'shortlink': '*SHORT LINK',
  'tools': '*MENU TOOLS*',
  'vote': '*MENU VOTING*',
  }
  if (teks == 'absen') tags = {
    'absen': 'MENU ABSEN',
    'vote': '*MENU VOTING*',
  }
  if (teks == 'anime') tags = {
  'anime': '*MENU ANIME*',
  }
  if (teks == 'sticker') tags = {
  'sticker': '*MENU CONVERT*',
  }
  if (teks == 'downloader') tags = {
  'downloader': '*MENU DOWNLOADER*',
  }
  if (teks == 'xp') tags = {
  'xp': '*MENU EXP*',
  }
  if (teks == 'fun') tags = {
  'fun': '*MENU FUN*',
  }
  if (teks == 'game') tags = {
  'game': '*MENU GAME*',
  }
  if (teks == 'github') tags = {
  'github': '*MENU GITHUB*',
  }
  if (teks == 'group') tags = {
  'group': '*MENU GROUP*',
  }
  if (teks == 'image') tags = {
  'image': '*MENU IMAGE*',
  }
  if (teks == 'info') tags = {
  'info': '*MENU INFO*',
  }
  if (teks == 'internet') tags = {
  'internet': '*INTERNET*',
  }
  if (teks == 'islam') tags = {
  'islam' : '*MENU ISLAMI*',
  }
  if (teks == 'kerang') tags = {
  'kerang': '*MENU KERANG*',
  }
  if (teks == 'maker') tags = {
  'maker': '*MENU MAKER*',
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'suara') tags = {
  'Pengubah Suara': '*PENGUBAH SUARA*',
  }
  if (teks == 'premium') tags = {
  'premium': '*PREMIUM MENU*',
  }
  if (teks == 'quotes') tags = {
  'quotes' : '*MENU QUOTES*',
  }
  if (teks == 'rpg') tags = {
  'rpg': '*MENU RPG*',
  }
  if (teks == 'stalk') tags = {
  'stalk': '*MENU STALK*',
  }
  if (teks == 'shortlink') tags = {
  'shortlink': '*SHORT LINK',
  }
  if (teks == 'tools') tags = {
  'tools': '*MENU TOOLS*',
  }

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = msgsz.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
let tulisan = `
${ucapan()} ${name}. Have a great day！
Terimakasih Atas Kunjungan Anda`.trim()
let sangek = `Berikut adalah list Menu Bot. klik pada "Click Here!" untuk melihat list menu.`
let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let help1 = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help1: Array.isArray(plugin.tags) ? plugin.help1 : [plugin.help1],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
   ftrol = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": ""
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}          



let listdesc = process.env.MENU_HEAD === undefined ? `┏━━━━`+global.botname+`━━━⬣
┃⬡ Active during ${uptime}
┃⬡ Total Users : ${Object.keys(global.db.data.users).length}
┃⬡ Mode : ${global.opts['self'] ? 'Self' : 'public'}
┃⬡ ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length} Chat Banned
┃⬡ ${Object.entries(global.db.data.users).filter(user => user[1].banned).length} Banned User
┃⬡ Don't spam
┗━━━━━━━━━━━━━━━⬣` : process.env.MENU_HEAD




      const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `${ucapan()}, ${name}`,
            description: `${listdesc}`,
            buttonText: 'LIST MENU',
            listType: 1,
            footerText: global.mainfooter,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `BOT OWNER`,
                  "description": "",
                  "rowId": `.owner`
                },{
                  "title": "SOURCE CODE",
                  "description": "",
                  "rowId": `${_p}? git`
                }],
                "title": "BOT INFORMATION"
              }, {
                "rows": [{
                  "title": `${listicon} ALL MENU`,
                  "description": "",
                  "rowId": '.? all'
                  }, {
                  "title": `${listicon} `+"ABSEN & VOTING",
                  "description": "",
                  "rowId": `${_p}? absen`
                }, {
                  "title": `${listicon} `+"ANIME MENU",
                  "description": "",
                  "rowId": `${_p}? anime`
                }, {
                  "title": `${listicon} `+"STICKER & CONVERTER",
                  "description": "",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": `${listicon} `+"DOWNLOADER MENU",
                  "description": "",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": `${listicon} `+"EXP & LIMIT",
                  "description": "",
                  "rowId": `${_p}? xp`
                }, {
                  "title": `${listicon} `+"FUN MENU",
                  "description": "",
                  "rowId": `${_p}? fun`
                }, {
                  "title": `${listicon} `+"GITHUB MENU",
                  "description": "",
                  "rowId": `${_p}? github`
                }, {
                  "title": `${listicon} `+"GROUP MENU",
                  "description": "",
                  "rowId": `${_p}? group`
                }, {
                  "title": `${listicon} `+"INTERNET MENU",
                  "description": "",
                  "rowId": `${_p}? internet`
                }, {
                  "title": `${listicon} `+"MAKER MENU",
                  "description": "",
                  "rowId": `${_p}? maker`
                }, {
                  "title": `${listicon} `+"OWNER MENU",
                  "description": "",
                  "rowId": `${_p}? owner`
                }, {
                  "title": `${listicon} `+"PREMIUM MENU",
                  "description": "",
                  "rowId": `${_p}? premium`
                }, {
                  "title": `${listicon} `+"QUOTES MENU",
                  "description": "",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": `${listicon} `+"STALKER MENU",
                  "description": "",
                  "rowId": `${_p}? stalk`
                }, {
                  "title": `${listicon} `+"SHORT LINK",
                  "description": "",
                  "rowId": `${_p}? shortlink`
                }, {
                  "title": `${listicon} `+"TOOLS MENU",
                  "description": "",
                  "rowId": `${_p}? tools`
                }
                  ],
                "title": "LIST MENU"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: ftrol });
    return await msgsz.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help1)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help1) groups[tag].push(plugin)
    }
    msgsz.menu = msgsz.menu ? msgsz.menu : {}
    let before = msgsz.menu.before || defaultMenu.before
    let before1 = msgsz.menu.before1 || defaultMenu.before1
    let before2 = msgsz.menu.before2 || defaultMenu.before2
    let header = msgsz.menu.header || defaultMenu.header
    let body = msgsz.menu.body || defaultMenu.body
    let footer = msgsz.menu.footer || defaultMenu.footer
    let after = msgsz.menu.after || (msgsz.user.jid == global.msgsz.user.jid ? '' : `Presented by https://wa.me/${global.msgsz.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        before1,
        before2,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help1.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help1).map(menu => {
              return menu.help1.map(help1 => {
                return body.replace(/%cmd/g, menu.prefix ? help1 : '%p' + help1)
                  .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                  .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof msgsz.menu == 'string' ? msgsz.menu : typeof msgsz.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: msgsz.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])


    if (menuimgs === null ) {return  await msgsz.sendTBA2(m.chat, text, wm, linkbuttid1, butturl1, linkbuttid2, butturl2, menubutton1, menubuttonid1, menubutton2, menubuttonid2, menubutton3, menubuttonid3) }

    else { return await msgsz.sendTBIA(m.chat, text, wm, menuimgs, linkbuttid1, butturl1, linkbuttid2, butturl2, menubutton1, menubuttonid1, menubutton2, menubuttonid2, menubutton3, menubuttonid3)}
let id = global.owner+'@s.whatsapp.net'

  } catch (e) {
    msgsz.reply(id, '```Error Report```\n\n'+`${e}`, m)
    throw e
  }
}
handler.help1 = ['menu', 'help1', '?']
handler.help1 = ['𝙼𝙴𝙽𝚄']

handler.tags = ['main']
handler.command = /^(melp|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  res = "Good Day"
  if (time >= 4) {
    res = "Good Morning"
  }
  if (time > 10) {
    res = "Good Afternoon"
  }
  if (time >= 15) {
    res = "Good Evening"
  }
  if (time >= 18) {
    res = "Good Night"
  }
  return res
}
