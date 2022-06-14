let fs = require('fs')
let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return
    let setting = global.db.data.settings

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Invitation to join') || m.text.startsWith('Invitation to join') || m.text.startsWith('Open this link')) && !m.isBaileys && !m.isGroup) {
    let teks = `${sa}${kki} Invite Group ${kka}
${gy} 1 Week   - 20 RS
${gy} 2 Week   - 30 RS
${gy} 1 Month  - 60 RS
${gy} Lifetime - 100 RS
*_Buy 2 Get 1 premium Membership For Free_*
${sb}

If interested contact: @${global.owner[0]} for order:)
`
    this.sendB(m.chat, teks, wm, null, [[`Rent & Up To Premium`, `.sewa`]], m, { mentions: this.parseMention(teks) })
    }



}

module.exports = handler
