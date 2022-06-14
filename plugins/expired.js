let handler = async (m, { msgsz, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) throw `Enter a number representing the number of days!\n\nExample:\n${usedPrefix + command} 30`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var jumlahHari = 86400000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += jumlahHari
    else global.db.data.chats[who].expired = now + jumlahHari
    conn.reply(m.chat, `Successfully set expiration day for *${await msgsz.getName(who)}* During ${args[0]} days.\n\nCountdown : ${msToDate(global.db.data.chats[who].expired - now)}`)
}
handler.help1 = ['ᴇxᴘɪʀᴇᴅ <ᴅᴀʏ>']
handler.help = ['𝙴𝚇𝙿𝙸𝚁𝙴𝙳']

handler.tags = ['owner']
handler.command = /^(expi(red)?|addsewa)$/i

handler.owner = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " Hour " + hours + " O'Clock " + minutes + " Minute";
    // +minutes+":"+sec;
}
