const { default: fetch } = require('node-fetch')
const { createWriteStream, existsSync } = require('fs')
const { promisify } = require('util')
const { join } = require('path')

let confirmation = {}
let repository = 'Alien-Alfa/WhatsApp-Bot-MD'
let branch = 'main'

async function handler(m, { text }) {
    let res = await fetch(`https://raw.githubusercontent.com/${repository}/${branch}/${text}`)
    if (!res.ok) throw await res.text()
    let filename = join(__dirname, '..', text)
    if (existsSync(filename)) {
        confirmation[m.sender] = {
            res,
            filename,
            text,
            timeout: setTimeout(() => (msgsz.sendB(m.chat, `Timeout, do you want update again?`, wm, null, [[`Yes`, `.u2 ${text}`], [`No`, `n`]], m), delete confirmation[m.sender]), 60000)
        }
        return msgsz.sendB(m.chat, `The file already exists, are you sure you want to overwrite it?  (Y/n) (60s Timeout)`, wm, null, [[`Yes`, `y`], [`No`, `n`]], m) 
    }
    res.body.pipe(createWriteStream(filename))
    res.body.once('end', () => {
        conn.reply(m.chat, 'Update successfully!')
        msgsz.sendFile(m.chat, filename, text, null, m).catch(console.error)
    })
}

handler.all = async m => {
    if (!(m.sender in confirmation)) return
    let { res, filename, text, timeout } = confirmation[m.sender]
    if (/^y(es|a)?$/i.test(m.text)) {
        res.body.pipe(createWriteStream(filename))
        res.body.once('end', () => {
            conn.reply(m.chat, 'Done overwrite!')
            msgsz.sendFile(m.chat, filename, text, null, m).catch(console.error)
        })
        clearTimeout(timeout)
        delete confirmation[m.sender]
        return !0
    } else if (/^no?$/i.test(m.text)) {
        delete confirmation[m.sender]
        conn.reply(m.chat, 'Rejected')
        clearTimeout(timeout)
        return !0
    }
}
handler.help1 = ['push']
handler.help = ['𝙿𝚄𝚂𝙷']
handler.tags = ['host']
handler.command = ['push']

handler.rowner = true

module.exports = handler
