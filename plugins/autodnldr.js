
const { Tiktok } = require('xfarr-api')
const { igdl, tiktok, twitter, pin } = require('../lib/scrape')
const { servers, yta, ytv } = require('../lib/y2mate')
const fetch = require('node-fetch')
const { youtubeSearch } = require('@bochilteam/scraper')
let util = require('util')
let handler = m => m

handler.all = async function (m, { isPrems }) {

    if (m.chat.endsWith('broadcast')) return
    if (db.data.users[m.sender].banned) return
    if (db.data.chats[m.chat].isBanned) return

    let url = m.text.split(/\n| /i)[0]

    if (/^.*tiktok/i.test(m.text)) 
    try {
        var anu = await Tiktok(args[0])
        var { urlz, medias } = anu
        
        if (!res.ok) return msgsz.reply(m.chat, eror)
        let json = await res.json()
        await msgsz.reply(m.chat, wait)
        // msgsz.reply(m.chat, util.format(json))
        let cap = ` *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${urlz}`)).data}`




        await msgsz.sendFile(m.chat, global.wm, wm+'tiktok-dnld.mp4', cap, m, 1, {
            asDocument: chat.useDocument,  ptt: true, contextInfo: {
              mentions:  [m.sender],
                externalAdReply: {
                    title: 'ᴛɪᴋᴛᴏᴋ ᴀᴜᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ', 
                    body: wm,
                    description: deslink,
                    mediaType: 2,
                  thumbnail: await(await fetch(img)).buffer(),
                 mediaUrl: insta,
                 sourceUrl: linkgc
                        }
             }
          })

        } catch {
          try {
          var anuu = await tiktok(args[0])
          var { wmi } = anuu
          msgsz.sendBV(m.chat, cap, global.wm, wmi, [[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], 0, {mentions: [m.sender]})
        } catch {
          throw msgsz.reply(m.chat, eror, m ) 
         }
       }






    



    if (/^.*(fb.watch|facebook.com)/i.test(m.text)) {
        let res = await fetch(API('neoxr', '/api/download/fb', { url }, 'apikey'))
        if (!res.ok) return msgsz.reply(m.chat, eror)
        let json = await res.json()
        if (!json.status) return msgsz.reply(m.chat, util.format(json))
        await msgsz.reply(m.chat, wait)
        await msgsz.sendFile(m.chat, json.data.sd.url, '', `HD: ${json.data.hd.url}\nSize: ${json.data.hd.size}\n\n©Team-MA`, m)

        await msgsz.sendMedia(m.chat, dl_link, null, {
            contextInfo: { mentionedJid: [m.sender],
              externalAdReply :{
              mediaUrl: `${args[0]}`,
              mediaType: 2,
              description: deslink, 
              title: titlink,
              body: bodlink, //`${filesizeF}`,
              thumbnail: await(await fetch(thumb)).buffer(), 
             }}
            })


    }

    if (/^https?:\/\/.*instagram.com\/(p|reel|tv)/i.test(m.text)) {
        igdl(url).then(async res => {
            let igdl = JSON.stringify(res)
            let json = JSON.parse(igdl)
            await msgsz.reply(m.chat, wait)
            for (let { downloadUrl, type } of json) {
                this.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), ' 𓊈𒆜ＡＬＩＥＮ  ＡＬＦＡ𒆜𓊉 ', m, 0, { thumbnail: await (await fetch(downloadUrl)).buffer() })

                await msgsz.sendMedia(m.chat, dl_link, null, {
                    contextInfo: { mentionedJid: [m.sender],
                      externalAdReply :{
                      mediaUrl: `${args[0]}`,
                      mediaType: 2,
                      description: deslink, 
                      title: titlink,
                      body: bodlink, //`${filesizeF}`,
                      thumbnail: await(await fetch(thumb)).buffer(), 
                     }}
                    })


            }
        }).catch(_ => _)
    }

    if (/^.*(pinterest.com\/pin|pin.it)/i.test(m.text)) {
        pin(url).then(async res => {
            let pin = JSON.stringify(res)
            let json = JSON.parse(pin)
            if (!json.status) return msgsz.reply(m.chat, eror)
            await msgsz.reply(m.chat, wait)
            msgsz.reply(m.chat, util.format(json))
            await this.sendFile(m.chat, json.data.url, '', ' 𓊈𒆜ＡＬＩＥＮ  ＡＬＦＡ𒆜𓊉 ', m)

            await msgsz.sendMedia(m.chat, dl_link, null, {
                contextInfo: { mentionedJid: [m.sender],
                  externalAdReply :{
                  mediaUrl: `${args[0]}`,
                  mediaType: 2,
                  description: deslink, 
                  title: titlink,
                  body: bodlink, //`${filesizeF}`,
                  thumbnail: await(await fetch(thumb)).buffer(), 
                 }}
                })


        }).catch(_ => _)
    }

    if (/^.*twitter.com\//i.test(m.text)) {
        twitter(url).then(async res => {
            let twit = JSON.stringify(res)
            let json = JSON.parse(twit)
            let pesan = json.data.map((v) => `Link: ${v.url}`).join('\n------------\n')
            await msgsz.reply(m.chat, wait)
            for (let { url } of json.data) {
                this.sendFile(m.chat, url, 'ig' + (/mp4/i.test(url) ? '.mp4' : '.jpg'), ' 𓊈𒆜ＡＬＩＥＮ  ＡＬＦＡ𒆜𓊉 ', m)

                await msgsz.sendMedia(m.chat, dl_link, null, {
                    contextInfo: { mentionedJid: [m.sender],
                      externalAdReply :{
                      mediaUrl: `${args[0]}`,
                      mediaType: 2,
                      description: deslink, 
                      title: titlink,
                      body: bodlink, //`${filesizeF}`,
                      thumbnail: await(await fetch(thumb)).buffer(), 
                     }}
                    })


            }
        }).catch(_ => _)
    }

    if (/^https?:\/\/.*youtu/i.test(m.text)) {
        let results = await youtubeSearch(url)
        let vid = results.all.find(video => video.seconds < 3600)
        if (!vid) return msgsz.reply(m.chat, 'Video/Audio Not Found!')
        let yt = false
        let usedServer = servers[0]
        for (let i in servers) {
            let server = servers[i]
            try {
                yt = await yta(vid.url, server)
                yt2 = await ytv(vid.url, server)
                usedServer = server
                break
            } catch (e) {
                msgsz.reply(m.chat, `Server ${server} error!${servers.length >= i + 1 ? '' : '\nAll Servers Down :(...'}`)
            }
        }
        if (yt === false) return msgsz.reply(m.chat, eror)
        if (yt2 === false) return msgsz.reply(m.chat, eror)
        let { dl_link, thumb, title, filesize, filesizeF } = yt
        await this.send2ButtonImg(m.chat, await (await fetch(thumb)).buffer(), `
*_ᴀᴜᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
*Title:* ${title}
*Size File Audio:* ${filesizeF}
*Size File Video:* ${yt2.filesizeF}
*Server y2mate:* ${usedServer}
`.trim(), '★彡[ʀᴀᴘʜᴀᴇʟ-ʙᴏᴛ]彡★', '🎶AUDIO', `.m ${vid.url}`, '🎞VIDEO️', `.v ${vid.url}`, m)
    }

}

handler.limit = false
module.exports = handler