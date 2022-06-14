let { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let { createHash} = require('crypto')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const { default: Users } = require('node-os-utils/lib/users')

var xnum = 1

var defaultMenu = {


    before: '╭────────────────╮\n'.trimStart(),
    before1:' |                      ᴀʟɪᴇɴ ᴀʟꜰᴀ                        |\n'.trimStart(),
    before2:'╰────────────────╯\n'.trimStart(),
    before3:'╭────────────────\n'.trimStart(),


    header: ``,
      body: `${gz}  `+'```  %cmd```',
  footer: ``,
          after: '```╰────────────────```',
}


let handler = async (m, { msgsz, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['bonk']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'bonk') tags = {
  'main': '*MENU UTAMA*',
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
  'advanced': '*ADVANCED*',

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
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') 
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    msgsz.menu = msgsz.menu ? msgsz.menu : {}
    let before = msgsz.menu.before || defaultMenu.before
    let before1 = msgsz.menu.before1 || defaultMenu.before1
    let before2 = msgsz.menu.before2 || defaultMenu.before2
    let before3 = msgsz.menu.before3 || defaultMenu.before3
    let header = msgsz.menu.header || defaultMenu.header
    let body = msgsz.menu.body || defaultMenu.body
    let footer = msgsz.menu.footer || defaultMenu.footer
    let after = msgsz.menu.after || (msgsz.user.jid == global.msgsz.user.jid ? '' : `Presented by https://wa.me/${global.msgsz.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        before1,
        before2,
        before3,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : help)
                  .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                  .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                  .replace(/%globar/g, xnum ? `${xnum++}` : xnum)

                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('')
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


    return await msgsz.sendTB(m.chat, text, wm, linkbuttid1, butturl1, linkbuttid2, butturl2, menubutton1, menubuttonid1, menubutton2, menubuttonid2, menubutton3, menubuttonid3)
    

  } catch (e) {
    msgsz.reply(m.chat, `${e}`, m)
    throw e
  }
}
handler.help1 = ['menu', 'help', '?']
handler.help = ['𝙼𝙴𝙽𝚄']

handler.tags = ['main']
handler.command = /^(flikckh|\])$/i
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
