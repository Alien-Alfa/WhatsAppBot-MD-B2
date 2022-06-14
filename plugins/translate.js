const translate = require('translate-google-api')
const defaultLang = 'en'
const tld = 'cn'

let handler = async (m, { args, usedPrefix, command }) => {
    let err = `
Example:
${usedPrefix + command} <ʟᴀɴɢ> [text]
${usedPrefix + command} id your messages

List of supported languages: https://cloud.google.com/translate/docs/languages
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : 'eh! no text!!?'

    let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        throw err
    } finally {
        msgsz.reply(m.chat, result[0], m)
    }

}
handler.help1 = ['ᴛʀᴀɴsʟᴀᴛᴇ'].map(v => v + ' <lang> <ᴛᴇxᴛ>')
handler.help = ['𝚃𝚁'].map(v => v + ' ')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

module.exports = handler
