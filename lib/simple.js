const {
  default: makeWASocket,
  MessageType,
  WAMessageProto,
  DEFAULT_ORIGIN,
  getAudioDuration,
  MessageTypeProto,
  MediaPathMap,
  Mimetype,
  MimetypeMap,
  compressImage,
  randomBytes,
  getMediaKeys,
  aesEncrypWithIV,
  hmacSign,
  sha256,
  encryptedStream,
  makeWALegacySocket,
  extractMessageContent,
  proto,
  WAMetric,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  getBinaryNodeChild,
  generateMessageID,
  jidDecode,
  areJidsSameUser,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  WA_DEFAULT_EPHEMERAL
} = require('@adiwajshing/baileys')
const chalk = require('chalk')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./exif')
const bind = require('./store')
const tr = require('translate-google')
const { toAudio, toPTT, toVideo } = require('./converter')
const { exec } = require('child_process')
const jimp_1 = require('jimp')
const fetch = require('node-fetch')
const FileType = require('file-type')
const fs = require('fs')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const request = require('request')
const { tmpdir } = require('os')
const util = require('util')



exports.makeWASocket = (connectionOptions, options = {}) => {
  let msgsz = (global.opts['legacy'] ? makeWALegacySocket : makeWASocket)(connectionOptions)

  msgsz.loadMessage = (messageID) => {
      return Object.entries(msgsz.chats)
          .filter(([_, { messages }]) => typeof messages === 'object')
          .find(([_, { messages }]) => Object.entries(messages)
          .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
          ?.[1].messages?.[messageID]
  }

  msgsz.decodeJid = (jid) => {
      if (!jid) return jid
      if (/:\d+@/gi.test(jid)) {
          let decode = jidDecode(jid) || {}
          return decode.user && decode.server && decode.user + '@' + decode.server || jid
      } else return jid
  }
  if (msgsz.user && msgsz.user.id) msgsz.user.jid = msgsz.decodeJid(msgsz.user.id)
  msgsz.chats = {}
  msgsz.contacts = {}

  function updateNameToDb(contacts) {
      if (!contacts) return
      for (let contact of contacts) {
          let id = msgsz.decodeJid(contact.id)
          if (!id) continue
          let chats = msgsz.contacts[id]
          if (!chats) chats = { id }
          let chat = {
              ...chats,
              ...({
                  ...contact, id, ...(id.endsWith('@g.us') ?
                      { subject: contact.subject || chats.subject || '' } :
                      { name: contact.notify || chats.name || chats.notify || '' })
              } || {})
          }
          msgsz.contacts[id] = chat
      }
  }
  msgsz.ev.on('contacts.upsert', updateNameToDb)
  msgsz.ev.on('groups.update', updateNameToDb)
  msgsz.ev.on('group-participants.update', async function updateParticipantsToDb({ id, participants, action }) {
      id = msgsz.decodeJid(id)
      if (!(id in msgsz.contacts)) msgsz.contacts[id] = { id }
      let groupMetadata = Object.assign((msgsz.contacts[id].metadata || {}), await msgsz.groupMetadata(id))
      for (let participant of participants) {
          participant = msgsz.decodeJid(participant)
          switch (action) {
              case 'add': {
                  if (participant == msgsz.user.jid) groupMetadata.readOnly = false
                  let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                  if (!same) groupMetadata.participants.push({ id, admin: null })
              }
                  break
              case 'remove': {
                  if (participant == msgsz.user.jid) groupMetadata.readOnly = true
                  let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                  if (same) {
                      let index = groupMetadata.participants.indexOf(same)
                      if (index !== -1) groupMetadata.participants.splice(index, 1)
                  }
              }
                  break
          }
      }
      msgsz.contacts[id] = {
          ...msgsz.contacts[id],
          subject: groupMetadata.subject,
          desc: groupMetadata.desc.toString(),
          metadata: groupMetadata
      }
  })
  

  msgsz.ev.on('groups.update', function groupUpdatePushToDb(groupsUpdates) {
      for (let update of groupsUpdates) {
          let id = msgsz.decodeJid(update.id)
          if (!id) continue
          if (!(id in msgsz.contacts)) msgsz.contacts[id] = { id }
          if (!msgsz.contacts[id].metadata) msgsz.contacts[id].metadata = {}
          let subject = update.subject
          if (subject) msgsz.contacts[id].subject = subject
          let announce = update.announce
          if (announce) msgsz.contacts[id].metadata.announce = announce
      }
  })
  msgsz.ev.on('chats.upsert', function chatsUpsertPushToDb(chats_upsert) {
      //console.log({ chats_upsert })
  })
  msgsz.ev.on('presence.update', function presenceUpdatePushToDb({ id, presences }) {
      let sender = Object.keys(presences)[0] || id
      let _sender = msgsz.decodeJid(sender)
      let presence = presences[sender]['lastKnownPresence'] || 'composing'
      if (!(_sender in msgsz.contacts)) msgsz.contacts[_sender] = {}
      msgsz.contacts[_sender].presences = presence
  })

  msgsz.logger = {
      ...msgsz.logger,
      info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(...args)) },
      error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(...args)) },
      warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(...args)) }
  }
  
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  msgsz.updateProfilePicture = async (jid, img) => {
    let data = await generateProfilePicture(img)
  let tap = this.generateMessageTag
    let query = ['picture', { jid: jid, id: tap, type: 'set' }, [['image', null, data.img], ['preview', null, data.preview]]]
  let response = await (this.setQuery([query], [WAMetric.picture, 136], tap))
  if (jid === this.user.jid) this.user.imgUrl = response.eurl
  else if (this.chats.get(jid)) {
    this.chats.get(jid).imgUrl = response.eurl
    this.emit('chat-update', { jid, imgUrl: response.eurl })
  }
  return response
}
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  /**
   * getBuffer hehe
   * @param {String|Buffer} path
   * @param {Boolean} returnFilename
   */
  msgsz.getFile = async (PATH, returnAsFilename) => {
      let res, filename
      let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
          mime: 'application/octet-stream',
          ext: '.bin'
      }
      if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
      return {
          res,
          filename,
          ...type,
          data
      }
  }

  /**
   * waitEvent
   * @param {*} eventName 
   * @param {Boolean} is 
   * @param {Number} maxTries 
   * @returns 
   */
  msgsz.waitEvent = (eventName, is = () => true, maxTries = 25) => {
      return new Promise((resolve, reject) => {
          let tries = 0
          let on = (...args) => {
              if (++tries > maxTries) reject('Max tries reached')
              else if (is()) {
                  msgsz.ev.off(eventName, on)
                  resolve(...args)
              }
          }
          msgsz.ev.on(eventName, on)
      })
  }

  /**
  * Send Media All Type 
  * @param {String} jid
  * @param {String|Buffer} path
  * @param {Object} quoted
  * @param {Object} options 
  */
  msgsz.sendMedia = async (jid, path, quoted, options = {}) => {
      let { ext, mime, data } = await msgsz.getFile(path)
      messageType = mime.split("/")[0]
      pase = messageType.replace('application', 'document') || messageType
      return await msgsz.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
  }

  /**
  * Send Media/File with Automatic Type Specifier
  * @param {String} jid
  * @param {String|Buffer} path
  * @param {String} filename
  * @param {String} caption
  * @param {Object} quoted
  * @param {Boolean} ptt
  * @param {Object} options
  */
  msgsz.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
      let type = await msgsz.getFile(path, true)
      let { res, data: file, filename: pathFile } = type
      if (res && res.status !== 200 || file.length <= 65536) {
          try { throw { json: JSON.parse(file.toString()) } }
          catch (e) { if (e.json) throw e.json }
      }
      let opt = { filename }
      if (quoted) opt.quoted = quoted
      if (!type) if (options.asDocument) options.asDocument = true
      let mtype = '', mimetype = type.mime
      if (/webp/.test(type.mime)) mtype = 'sticker'
      else if (/image/.test(type.mime)) mtype = 'image'
      else if (/video/.test(type.mime)) mtype = 'video'
      else if (/audio/.test(type.mime)) (
          convert = await (ptt ? toPTT : toAudio)(file, type.ext),
          file = convert.data,
          pathFile = convert.filename,
          mtype = 'audio',
          mimetype = 'audio/ogg; codecs=opus'
      )
      else mtype = 'document'
      return await msgsz.sendMessage(jid, {
          ...options,
          caption,
          ptt,
          [mtype]: { url: pathFile },
          mimetype
      }, {
          ...opt,
          ...options
      })
  }

  /**
  * Send Video Faster
  * @param {String} jid 
  * @param {String|Buffer} url 
  * @param {String} caption 
  * @param {Object} quoted 
  * @param {Object} options 
  */



  /**
 * Send Contact
 * @param {String} jid 
 * @param {String} number 
 * @param {String} name 
 * @param {Object} quoted 
 * @param {Object} options 
 */
  msgsz.sendContact = async (jid, number, name, quoted, options) => {
      number = number.replace(/[^0-9]/g, '')
      let njid = number + '@s.whatsapp.net'
      let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
  `
      return await msgsz.sendMessage(jid, {
          contacts: {
              displayName: `${name}`,
              contacts: [{ vcard }],
              quoted,
              ...options
          }
      },
          {
              quoted,
              ...options
          })
  }

  /**
   * Send Contact Array
   * @param {String} jid 
   * @param {String} number 
   * @param {String} name 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendContactArray = async (jid, data, quoted, options) => {
      let contacts = []
      for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
          number = number.replace(/[^0-9]/g, '')
          let njid = number + '@s.whatsapp.net'
          let biz = await msgsz.getBusinessProfile(njid) || {}
          // N:;${name.replace(/\n/g, '\\n').split(' ').reverse().join(';')};;;
          let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
END:VCARD`.trim()
          contacts.push({ vcard, displayName: name })

      }
      return await msgsz.sendMessage(jid, {
          contacts: {
              displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
              contacts,
          }
      },
          {
              quoted,
              ...options
          })
  }

  /**
  * isi
  */
  msgsz.rand = async (isi) => {
      return isi[Math.floor(Math.random() * isi.length)]
  }
  
  /**
  * code text
  */
  msgsz.trans = async (code, text) => {
      let tr = require('translate-google-api')
      return tr(text, { from: 'id', to: code })
  }
  msgsz.trans2 = async (code, text) => {
      let tr = require('translate-google')
      return tr(text, { from: 'id', to: code })
  }
  msgsz.trans3 = async (code, text) => {
      let tr = require('translate-google-api')
      return tr(text, { from: 'auto', to: code })
  } 
  
  /**
  *status 
  */
  msgsz.setStatus = async (status) => {
      return await msgsz.query({
          tag: 'iq',
          attrs: {
              to: 's.whatsapp.net',
              type: 'set',
              xmlns: 'status',
          },
          content: [
              {
                  tag: 'status',
                  attrs: {},
                  content: Buffer.from(status, 'utf-8')
              }
          ]
      })
      // <iq to="s.whatsapp.net" type="set" xmlns="status" id="21168.6213-69"><status>"Hai, saya menggunakan WhatsApp"</status></iq>
  }

  /**
   * Reply to a message
   * @param {String} jid
   * @param {String|Object} text
   * @param {Object} quoted
   * @param {Object} mentions [m.sender]
   */
  msgsz.reply = async (jid, text = '', quoted, options) => {
      return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : msgsz.sendMessage(jid, { ...options, text }, { quoted, ...options })
  }
  msgsz.reply2 = async (jid, text = '', quoted, options) => {
      return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : msgsz.sendMessage(jid, { ...options, text: await tr(text, {from: 'auto', to: lang}) }, { quoted, ...options })
  }
  msgsz.fakeReply = (jid, text = '', fakeJid = msgsz.user.jid, fakeText = '', fakeGroupJid, options) => {
      return msgsz.sendMessage(jid, { text: text }, { quoted: { key: { fromMe: fakeJid == msgsz.user.jid, participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options } })
  }

  /**
   * send Button
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer? 
   * @param {String[]} buttons 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendB = async (jid, contentText, footer, buffer, buttons, quoted, options) => {
      if (buffer) try { buffer = (await msgsz.getFile(buffer)).data } catch { buffer = null }
      let message = {
          ...options,
          ...(buffer ? { caption: contentText || '' } : { text: contentText || '' }),
          footer,
          buttons: buttons.map(btn => {
              return {
                  buttonId: btn[1] || btn[0] || '',
                  buttonText: {
                      displayText: btn[0] || btn[1] || ''
                  }
              }
          }),
          ...(buffer ? { image: buffer } : {})
      }
      return await msgsz.sendMessage(jid, message, { quoted, upload: msgsz.waUploadToServer, ...options })
  }

  msgsz.sendL = async (jid, latitude, longitude, name, address, url, location, quoted, options) => {
      let message = {
          ...options,
          location: {
              jpegThumbnail: await (await fetch(location)).buffer(),
              degreesLatitude: latitude,
              degreesLongitude: longitude,
              name: name,
              url: url,
              address: address
          }
      }
      return await msgsz.sendMessage(jid, message, { quoted, upload: msgsz.waUploadToServer, ...options })
  }

  /**
   * send Button Loc
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer
   * @param {String[]} buttons 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendBL = async (jid, contentText, footer, location, buttons, quoted, options) => {
      let message = {
          headerType: 6, ...options,
          location: { jpegThumbnail: await (await fetch(location)).buffer() },
          caption: contentText,
          footer: footer,
          buttons: buttons.map(btn => {
              return {
                  buttonId: btn[1] || btn[0] || '',
                  buttonText: {
                      displayText: btn[0] || btn[1] || ''
                  }
              }
          }),
          //buffer: { location: {jpegThumbnail: buffer} }
      }
      return await msgsz.sendMessage(jid, message, { quoted, upload: msgsz.waUploadToServer, ...options
      })
  }

  /**
   * send Button Img
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String[]} buttons 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendBI = async (jid, contentText, footer, image, buttons, quoted, options) => { 
      let message = {
          image: { url: image }, ...options,
          caption: contentText,
          headerType: 4,
          footer: footer,
          buttons: buttons.map(mk => {
              return {
                  buttonId: mk[1] || mk[0] || '',
                  buttonText: {
                      displayText: mk[0] || mk[1] || ''
                  }
              }
          })
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  /**
* send Button Vid
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String[]} buttons 
* @param {Object} quoted 
* @param {Object} options 
*/
  msgsz.sendBV = async (jid, contentText, footer, video, buttons, quoted, options) => {
      let message = {
          video: { url: video }, ...options,
          caption: contentText,
          headerType: 4,
          footer: footer,
          buttons: buttons.map(mk => {
              return {
                  buttonId: mk[1] || mk[0] || '',
                  buttonText: {
                      displayText: mk[0] || mk[1] || ''
                  }
              }
          })
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }

  /**
   * send Button Document 
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String[]} buttons 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendBD = async (jid, contentText, footer, doc, buttons, quoted, options) => {
      let message = {
          document: { url: doc },
          ...options,
          caption: contentText,
          headerType: 4,
          footer: footer,
          buttons: buttons.map(mk => {
              return {
                  buttonId: mk[1] || mk[0] || '',
                  buttonText: {
                      displayText: mk[0] || mk[1] || ''
                  }
              }
          })
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }

  /**
  * send Button
  * @param {String} jid 
  * @param {String} contentText 
  * @param {String} footer
  * @param {Buffer|String} buffer 
  * @param {String[]} buttons 
  * @param {proto.WebMessageInfo} quoted 
  * @param {Object} options 
  */
  msgsz.sendButton = async (jid, text = '', footer = '', buffer, buttons, quoted, options = {}) => {
      let type
      if (buffer) try { (type = await msgsz.getFile(buffer), buffer = type.data) } catch { buffer = null }
      let message = {
          ...options,
          [buffer ? 'caption' : 'text']: text || '',
          footer,
          buttons: buttons.map(btn => ({
              buttonId: btn[1] || btn[0] || '',
              buttonText: {
                  displayText: btn[0] || btn[1] || ''
              }
          })),
          ...(buffer ?
              options.asLocation && /image/.test(type.mime) ? {
                  location: {
                      ...options,
                      jpegThumbnail: buffer
                  }
              } : {
                  [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
              } : {})
      }
      delete options.asLocation
      delete options.asVideo
      delete options.asDocument
      delete options.asImage
      return await msgsz.sendMessage(jid, message, {
          quoted,
          upload: msgsz.waUploadToServer,
          ...options
      })
  }

  /**
   * 
   * @param {String} jid 
   * @param {String} text 
   * @param {String} footer 
   * @param {fs.PathLike} buffer 
   * @param {String} url 
   * @param {String} urlText
   * @param {String} call 
   * @param {String} callText
   * @param {String} buttons 
   * @param {proto.WebMessageInfo} quoted 
   * @param {Object} options 
   */
  msgsz.sendHydrated = async (jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options = {}) => {
      let type
      if (buffer) try { (type = await msgsz.getFile(buffer), buffer = type.data) } catch { buffer = null }
      let templateButtons = []
      if (url || urlText) templateButtons.push({
          index: 1,
          urlButton: {
              displayText: urlText || url || '',
              url: url || urlText || ''
          }
      })
      if (call || callText) templateButtons.push({
          index: templateButtons.length + 1,
          urlButton: {
              displayText: callText || call || '',
              phoneNumber: call || callText || ''
          }
      })
      templateButtons.push(...(buttons.map(([text, id], index) => ({
          index: templateButtons.length + index + 1,
          quickReplyButton: {
              displayText: text || id || '',
              id: id || text || ''
          }
      })) || []))
      let message = {
          ...options,
          [buffer ? 'caption' : 'text']: text || '',
          footer,
          templateButtons,
          ...(buffer ?
              options.asLocation && /image/.test(type.mime) ? {
                  location: {
                      ...options,
                      jpegThumbnail: buffer
                  }
              } : {
                  [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
              } : {})
      }

      delete options.asLocation
      delete options.asVideo
      delete options.asDocument
      delete options.asImage
      return await msgsz.sendMessage(jid, message, {
          quoted,
          upload: msgsz.waUploadToServer,
          ...options
      })
  }
  //========== Template Here ==========// 

  /**
  * send Template Button
  * @param {String} jid 
  * @param {String} contentText 
  * @param {String} footer
  * @param {String} buttons
  * @param {String} row
  * @param {Object} quoted 
  */
  msgsz.sendTB = async (jid, contentText, footer, dtux, urlx, dtuxx, urlxx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          ...options,
          text: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: dtux,
                      url: urlx
                  }
              },
              {
                  urlButton: {
                      displayText: dtuxx,
                      url: urlxx
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons3,
                      id: row3
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  
  /**
   * send Template Button Doc  
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String} buttons1
   * @param {String} row1
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendTBD = async (jid, contentText, footer, thumb, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          document: { url: docux }, ...options,
          jpegThumbnail: await (await fetch(thumb)).buffer(), fileName: global.nd, mimetype: 'image/png', fileLength: global.fsdx, pageCount: global.pcdx,
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              },
              {
                  urlButton: {
                      displayText: linkbuttid2,
                      url: butturl2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons3,
                      id: row3
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }







/*|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|
  
                                            °◦¸¸.◦°˚°◦☙°◦¸¸.◦°˚°◦☙ミミ◦❧◦°˚°◦.¸¸◦°´❤*•.
   

                                            ██████╗░██╗░░░██╗██████╗░██╗░░░░░██╗░█████╗░
                                            ██╔══██╗██║░░░██║██╔══██╗██║░░░░░██║██╔══██╗
                                            ██████╔╝██║░░░██║██████╦╝██║░░░░░██║██║░░╚═╝
                                            ██╔═══╝░██║░░░██║██╔══██╗██║░░░░░██║██║░░██╗
                                            ██║░░░░░╚██████╔╝██████╦╝███████╗██║╚█████╔╝
                                            ╚═╝░░░░░░╚═════╝░╚═════╝░╚══════╝╚═╝░╚════╝░
 
 
                                            .•*❤´°◦¸¸.◦°˚°◦☙◦彡彡❧◦°˚°◦.¸¸◦°❧◦°˚°◦.¸¸◦°
   
  |⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|*/ 
  


  /**
  * send Template Button
  * @param {String} jid 
  * @param {String} contentText 
  * @param {String} footer
  * @param {String} buttons
  * @param {String} row
  * @param {Object} quoted 
  */
   msgsz.sendTBA = async (jid, contentText, footer, dtux, urlx, buttons1, row1, buttons2, row2, quoted, options) => {
    const message = {
        ...options,
        text: contentText,
        footer: footer,
        templateButtons: [
            {
                urlButton: {
                    displayText: dtux,
                    url: urlx
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons1,
                    id: row1
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons2,
                    id: row2
                }
            },
        ]
    }
    return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
} 






/**
* send Template Button
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {String} buttons
* @param {String} row
* @param {Object} quoted 
*/
  msgsz.sendTBA2 = async (jid, contentText, footer, dtux, urlx, dtuxx, urlxx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
  const message = {
      ...options,
      text: contentText,
      footer: footer,
      templateButtons: [
          {
              urlButton: {
                  displayText: dtux,
                  url: urlx
              }
          },
          {
            urlButton: {
                displayText: dtuxx,
                url: urlxx
            }
         },

          {
              quickReplyButton: {
                  displayText: buttons1,
                  id: row1
              }
          },
          {
              quickReplyButton: {
                  displayText: buttons2,
                  id: row2
              }
          },
          {
            quickReplyButton: {
                displayText: buttons3,
                id: row3
            }
        },
      ]
  }
  return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
}




//msgsz.sendALFA = async (jid, contentText, footer, image, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {


  /**
   * send Template Button Doc withou call 
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String} buttons1
   * @param {String} row1
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendALFA = async (jid, contentText, footer, image, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          image: { url: image }, ...options,
          jpegThumbnail: await (await fetch(thumbt)).buffer(),
          caption: contentText,
          footer: footer,
          templateButtons: [
            {
                urlButton: {
                    displayText: linkbuttid1,
                    url: butturl1
                }
            },
            {
                urlButton: {
                    displayText: linkbuttid2,
                    url: butturl2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons1,
                    id: row1
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons2,
                    id: row2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons3,
                    id: row3
                }
            },
        ]
    }
    return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }



  msgsz.sendTBIA = async (jid, contentText, footer, image, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
    const message = {
        image: { url: image }, ...options,
        jpegThumbnail: await (await fetch(thumbt)).buffer(),
        caption: contentText,
        footer: footer,
        templateButtons: [
            {
                urlButton: {
                    displayText: linkbuttid1,
                    url: butturl1
                }
            },
            {
                urlButton: {
                    displayText: linkbuttid2,
                    url: butturl2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons1,
                    id: row1
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons2,
                    id: row2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons3,
                    id: row3
                }
            },
        ]
    }
    return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
}






/*|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|
  
                                            °◦¸¸.◦°˚°◦☙°◦¸¸.◦°˚°◦☙ミミ◦❧◦°˚°◦.¸¸◦°´❤*•.
   

                                            ██████╗░██╗░░░██╗██████╗░██╗░░░░░██╗░█████╗░
                                            ██╔══██╗██║░░░██║██╔══██╗██║░░░░░██║██╔══██╗
                                            ██████╔╝██║░░░██║██████╦╝██║░░░░░██║██║░░╚═╝
                                            ██╔═══╝░██║░░░██║██╔══██╗██║░░░░░██║██║░░██╗
                                            ██║░░░░░╚██████╔╝██████╦╝███████╗██║╚█████╔╝
                                            ╚═╝░░░░░░╚═════╝░╚═════╝░╚══════╝╚═╝░╚════╝░
 
 
                                            .•*❤´°◦¸¸.◦°˚°◦☙◦彡彡❧◦°˚°◦.¸¸◦°❧◦°˚°◦.¸¸◦°
   
  |⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|*/ 
  






/**
   * send Template Button Doc withou call 
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String} buttons1
   * @param {String} row1
   * @param {Object} quoted 
   * @param {Object} options 
   */
msgsz.sendTBD2 = async (jid, contentText, footer, thumb, linkbuttid1, butturl1,buttons1, row1, buttons2, row2,quoted, options) => {
  const message = {
      document: { url: docux }, ...options,
      jpegThumbnail: await (await fetch(thumb)).buffer(), fileName: global.nd, mimetype: 'image/png', fileLength: global.fsdx, pageCount: global.pcdx,
      caption: contentText,
      headerType: 4,
      footer: footer,
      templateButtons: [
          {
              urlButton: {
                  displayText: linkbuttid1,
                  url: butturl1
              }
          },
          {
              quickReplyButton: {
                  displayText: buttons1,
                  id: row1
              }
          },
          {
              quickReplyButton: {
                  displayText: buttons2,
                  id: row2
              }
          },
      ]
  }
  return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
}
  /**
   * send Template Button Loc
   * @param {String} jid 
   * @param {String} contentText 
   * @param {String} footer
   * @param {Buffer|String} buffer 
   * @param {String} buttons1
   * @param {String} row1
   * @param {Object} quoted 
   * @param {Object} options 
   */
  msgsz.sendTBL = async (jid, contentText, footer, thumb, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          location: { jpegThumbnail: await (await fetch(thumb)).buffer() },
          ...options,
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              },
              {
                  urlButton: {
                      displayText: linkbuttid2,
                      url: butturl2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons3,
                      id: row3
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  
  /**
* send Button Img
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String} buttons1
* @param {String} row1
* @param {Object} quoted 
* @param {Object} options 
*/
  msgsz.sendTBI = async (jid, contentText, footer, image, linkbuttid1, butturl1, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          image: { url: image }, ...options,
          jpegThumbnail: await (await fetch(thumbt)).buffer(),
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  /**
* send Button Img
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String} buttons1
* @param {String} row1
* @param {Object} quoted 
* @param {Object} options 
*/
   msgsz.sendTBI2 = async (jid, contentText, footer, image, linkbuttid1, butturl1, buttons1, row1, buttons2, row2, quoted, options) => {
      const message = {
          image: { url: image }, ...options,
          jpegThumbnail: await (await fetch(thumbt)).buffer(),
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  
  
  /**
* send Button Video 
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String} buttons1
* @param {String} row1
* @param {Object} quoted 
* @param {Object} options 
*/
  msgsz.sendTBV = async (jid, contentText, footer, video, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
      const message = {
          video: { url: video }, ...options,
          jpegThumbnail: await (await fetch(thumbt)).buffer(),
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              },
              {
                  urlButton: {
                      displayText: linkbuttid2,
                      url: butturl2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons3,
                      id: row3
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }

  /**
     * send Button Video Gif
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footer
     * @param {Buffer|String} buffer 
     * @param {String} buttons1
     * @param {String} row1
     * @param {Object} quoted 
     * @param {Object} options 
     */
  msgsz.sendTBVG = async (jid, contentText, footer, video, linkbuttid1, butturl1, buttons1, row1, buttons2, row2,quoted, options) => {
      const message = {
          video: { url: video }, ...options,
          gifPlayback: true, jpegThumbnail: await (await fetch(thumbt)).buffer(), fileLength: fsx,
          caption: contentText,
          footer: footer,
          templateButtons: [
              {
                  urlButton: {
                      displayText: linkbuttid1,
                      url: butturl1
                  }
              }
              ,
              {
                  quickReplyButton: {
                      displayText: buttons1,
                      id: row1
                  }
              },
              {
                  quickReplyButton: {
                      displayText: buttons2,
                      id: row2
                  }
              },
          ]
      }
      return await msgsz.sendMessage(jid, message, { quoted: quoted, ...options })
  }
  /**
  * sendGroupV4Invite
  * @param {String} jid 
  * @param {*} participant 
  * @param {String} inviteCode 
  * @param {Number} inviteExpiration 
  * @param {String} groupName 
  * @param {String} caption 
  * @param {*} options 
  * @returns 
  */
  msgsz.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
      let msg = proto.Message.fromObject({
          groupInviteMessage: proto.GroupInviteMessage.fromObject({
              inviteCode,
              inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
              groupJid: jid,
              groupName: groupName ? groupName : this.getName(jid),
              caption
          })
      })
      let message = await this.prepareMessageFromContent(participant, msg, options)
      await this.relayWAMessage(message)
      return message
  }

  /**
  *Message
  */
  msgsz.relayWAMessage = async (pesanfull) => {
      if (pesanfull.message.audioMessage) {
          await msgsz.sendPresenceUpdate('recording', pesanfull.key.remoteJid)
      } else {
          await msgsz.sendPresenceUpdate('composing', pesanfull.key.remoteJid)
      }
      var mekirim = await msgsz.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
      msgsz.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
      return mekirim
  }

  /**
  * cMod
  * @param {String} jid 
  * @param {*} message 
  * @param {String} text 
  * @param {String} sender 
  * @param {*} options 
  * @returns 
  */

  msgsz.cMod = async (jid, message, text = '', sender = msgsz.user.jid, options = {}) => {
      if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
      let copy = message.toJSON()
      delete copy.message.messageContextInfo
      delete copy.message.senderKeyDistributionMessage
      let mtype = Object.keys(copy.message)[0]
      let msg = copy.message
      let content = msg[mtype]
      if (typeof content === 'string') msg[mtype] = text || content
      else if (content.caption) content.caption = text || content.caption
      else if (content.text) content.text = text || content.text
      if (typeof content !== 'string') {
          msg[mtype] = { ...content, ...options }
          msg[mtype].contextInfo = {
              ...(content.contextInfo || {}),
              mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
          }
      }
      if (copy.participant) sender = copy.participant = sender || copy.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
      else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
      copy.key.remoteJid = jid
      copy.key.fromMe = areJidsSameUser(sender, msgsz.user.id) || false
      return proto.WebMessageInfo.fromObject(copy)
  }
  /**
   * Exact Copy Forward
   * @param {String} jid
   * @param {Object} message
   * @param {Boolean|Number} forwardingScore
   * @param {Object} options
   */
  msgsz.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
      let m = generateForwardMessageContent(message, !!forwardingScore)
      let mtype = Object.keys(m)[0]
      if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
      m = generateWAMessageFromContent(jid, m, { ...options, userJid: msgsz.user.id })
      await msgsz.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
      return m
  }
  /**
   * Download media message
   * @param {Object} m
   * @param {String} type 
   * @param {fs.PathLike|fs.promises.FileHandle} filename
   * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
   */
  msgsz.downloadM = async (m, type, filename = '') => {
      if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
      const stream = await downloadContentFromMessage(m, type)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      if (filename) await fs.promises.writeFile(filename, buffer)
      return filename && fs.existsSync(filename) ? filename : buffer
  }
  
  msgsz.downloadMed = async (message, filename, attachExtension = true) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
      //trueFileName = attachExtension ? filename : filename
      // save to file
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
  }
  
  msgsz.linkDownload = (message) => {
    if (message.url && message.mediaKey) {
      const mediakei = Buffer.from(message.mediaKey).toString('base64')
      return `https://mmg.soff.tk/d/f/${message.url.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${message.mimetype.split('/')[0]}`	
    }
    const psn = message.message[message.mtype]
    const urlmsg = psn?.url
    if (!urlmsg) return
    const mediakei = Buffer.from(psn.mediaKey).toString('base64')
    return `https://mmg.soff.tk/d/f/${urlmsg.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${psn.mimetype.split('/')[0]}`
  }
  
  /**
   * Read message
   * @param {String} jid 
   * @param {String|undefined|null} participant 
   * @param {String} messageID 
   */
  msgsz.chatRead = async (jid, participant, messageID) => {
      return await msgsz.sendReadReceipt(jid, participant, [messageID])
  }
  
  /**
   * Parses string into mentionedJid(s)
   * @param {String} text
   */
   msgsz.parseMention = (text = '') => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
  
  msgsz.sendStimg = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
          buffer = await writeExifImg(buff, options)
      } else {
          buffer = await imageToWebp(buff)
      }
      await msgsz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
      return buffer
  }
  
  msgsz.sendStvid = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
          buffer = await writeExifVid(buff, options)
      } else {
          buffer = await videoToWebp(buff)
      }
      await msgsz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
      return buffer
  }

  msgsz.saveName = async (id, name = '') => {
      if (!id) return
      id = msgsz.decodeJid(id)
      let isGroup = id.endsWith('@g.us')
      if (id in msgsz.contacts && msgsz.contacts[id][isGroup ? 'subject' : 'name'] && id in msgsz.chats) return
      let metadata = {}
      if (isGroup) metadata = await msgsz.groupMetadata(id)
      let chat = { ...(msgsz.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
      msgsz.contacts[id] = chat
      msgsz.chats[id] = chat
  }

  /**
   * Get name from jid
   * @param {String} jid
   * @param {Boolean} withoutContact
   */
  msgsz.getName = (jid = '', withoutContact = false) => {
      jid = msgsz.decodeJid(jid)
      withoutContact = msgsz.withoutContact || withoutContact
      let v
      if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
          v = msgsz.chats[jid] || {}
          if (!(v.name || v.subject)) v = await msgsz.groupMetadata(jid) || {}
          resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
      })
      else v = jid === '0@s.whatsapp.net' ? {
          jid,
          vname: 'WhatsApp'
      } : areJidsSameUser(jid, msgsz.user.id) ?
          msgsz.user :
          (msgsz.chats[jid] || {})
      return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }

  msgsz.pushMessage = (m) => {
      if (['senderKeyDistributionMessage', 'protocolMessage'].includes(m.mtype)) return
      let id = m.chat
      let chats = msgsz.chats[id]
      if (!chats) chats = { id }
      if (!chats.messages) chats.messages = {}
      chats.messages[m.id] = JSON.stringify(m, null, 2)
  }
  msgsz.getBusinessProfile = async (jid) => {
      const results = await msgsz.query({
          tag: 'iq',
          attrs: {
              to: 's.whatsapp.net',
              xmlns: 'w:biz',
              type: 'get'
          },
          content: [{
              tag: 'business_profile',
              attrs: { v: '244' },
              content: [{
                  tag: 'profile',
                  attrs: { jid }
              }]
          }]
      })
      const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
      if (!profiles) return {} // if not bussines
      const address = getBinaryNodeChild(profiles, 'address')
      const description = getBinaryNodeChild(profiles, 'description')
      const website = getBinaryNodeChild(profiles, 'website')
      const email = getBinaryNodeChild(profiles, 'email')
      const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
      return {
          jid: profiles.attrs?.jid,
          address: address?.content.toString(),
          description: description?.content.toString(),
          website: website?.content.toString(),
          email: email?.content.toString(),
          category: category?.content.toString(),
      }
  }
  /**
   * Serialize Message, so it easier to manipulate
   * @param {Object} m
   */
  msgsz.serializeM = (m) => {
      return exports.smsg(msgsz, m)
  }

  Object.defineProperty(msgsz, 'name', {
      value: { ...(options.chats || {}) },
      configurable: true,
  })
  if (msgsz.user?.id) msgsz.user.jid = msgsz.decodeJid(msgsz.user.id)
  bind(msgsz)
  return msgsz
}
/**
* Serialize Message
* @param {WAConnection} msgsz 
* @param {Object} m 
* @param {Boolean} hasParent 
*/
exports.smsg = (msgsz, m, hasParent) => {
  if (!m) return m
  let M = proto.WebMessageInfo
  m = M.fromObject(m)
  /*if (m.key) {
      m.id = m.key.id
      m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
      m.chat = msgsz.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
      m.isGroup = m.chat.endsWith('@g.us')
      m.sender = msgsz.decodeJid(m.key.fromMe && msgsz.user.id || m.participant || m.key.participant || m.chat || '')
      m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, msgsz.user.id)
  }
  if (m.message) {
      let mtype = Object.keys(m.message)
      m.mtype = (mtype[0] !== 'senderKeyDistributionMessage' && mtype[0]) || // Sometimes message in the front
          (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
          mtype[mtype.length - 1] // common case
      if (['messageContextInfo', 'senderKeyDistributionMessage'].includes(m.mtype) && mtype.length >= 3) console.log(mtype)
      m.msg = m.message[m.mtype]
      if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
      if (m.mtype == 'protocolMessage' && m.msg.key) {
          if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
          if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
          m.msg.key.fromMe = msgsz.decodeJid(m.msg.key.participant) === msgsz.decodeJid(msgsz.user.id)
          if (!m.msg.key.fromMe && m.msg.key.remoteJid === msgsz.decodeJid(msgsz.user.id)) m.msg.key.remoteJid = m.sender
      }
      m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
      if (typeof m.text !== 'string') {
          if ([
              'protocolMessage',
              'messageContextInfo',
              'stickerMessage',
              'audioMessage',
              'senderKeyDistributionMessage'
          ].includes(m.mtype)) m.text = ''
          else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
      }
      m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
      let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
      if (m.quoted) {
          let type = Object.keys(m.quoted)[0]
          m.quoted = m.quoted[type]
          if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
          m.quoted.mtype = type
          m.quoted.id = m.msg.contextInfo.stanzaId
          m.quoted.chat = msgsz.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
          m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
          m.quoted.sender = msgsz.decodeJid(m.msg.contextInfo.participant)
          m.quoted.fromMe = m.quoted.sender === msgsz.user.jid
          m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
          m.quoted.name = msgsz.getName(m.quoted.sender)
          m.quoted.mentionedJid = m.quoted.contextInfo && m.quoted.contextInfo.mentionedJid && m.quoted.contextInfo.mentionedJid.length && m.quoted.contextInfo.mentionedJid || []
          let vM = m.quoted.fakeObj = M.fromObject({
              key: {
                  fromMe: m.quoted.fromMe,
                  remoteJid: m.quoted.chat,
                  id: m.quoted.id
              },
              message: quoted,
              ...(m.isGroup ? { participant: m.quoted.sender } : {})
          })
          m.getQuotedObj = m.getQuotedMessage = async () => {
              if (!m.quoted.id) return null
              let q = M.fromObject(await msgsz.loadMessage(m.quoted.id) || vM)
              return exports.smsg(msgsz, q)
          }*/
          
  if (m.key) {
      m.id = m.key.id
      m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
      m.chat = msgsz.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
      m.isGroup = m.chat.endsWith('@g.us')
      m.sender = msgsz.decodeJid(m.key.fromMe && msgsz.user.id || m.participant || m.key.participant || m.chat || '')
      m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, msgsz.user.id) || [global.msgsz.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
  }
  if (m.message) {
      let mtype = Object.keys(m.message)
      m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || // Sometimes message in the front
          (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
          mtype[mtype.length - 1] // common case
      m.msg = m.message[m.mtype]
      if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
      if (m.mtype == 'protocolMessage' && m.msg.key) {
          if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
          if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
          m.msg.key.fromMe = msgsz.decodeJid(m.msg.key.participant) === msgsz.decodeJid(msgsz.user.id)
          if (!m.msg.key.fromMe && m.msg.key.remoteJid === msgsz.decodeJid(msgsz.user.id)) m.msg.key.remoteJid = m.sender
      }
      m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
      if (typeof m.text !== 'string') {
          if ([
              'protocolMessage',
              'messageContextInfo',
              'stickerMessage',
              'audioMessage',
              'senderKeyDistributionMessage'
          ].includes(m.mtype)) m.text = ''
          else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
      }
      m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
      let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
      if (m.quoted) {
          let type = Object.keys(m.quoted)[0]
          m.quoted = m.quoted[type]
          if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
          m.quoted.mtype = type
          m.quoted.id = m.msg.contextInfo.stanzaId
          m.quoted.chat = msgsz.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
          m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
          m.quoted.sender = msgsz.decodeJid(m.msg.contextInfo.participant)
          m.quoted.fromMe = m.quoted.sender === msgsz.user.jid
          m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
          m.quoted.name = msgsz.getName(m.quoted.sender)
          m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
          let vM = m.quoted.fakeObj = M.fromObject({
              key: {
                  fromMe: m.quoted.fromMe,
                  remoteJid: m.quoted.chat,
                  id: m.quoted.id
              },
              message: quoted,
              ...(m.isGroup ? { participant: m.quoted.sender } : {})
          })
          m.getQuotedObj = m.getQuotedMessage = async () => {
              if (!m.quoted.id) return null
              let q = M.fromObject(await msgsz.loadMessage(m.quoted.id) || vM)
              return exports.smsg(msgsz, q)
          }

          if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => msgsz.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)

          /**
           * Reply to quoted message
           * @param {String|Object} text
           * @param {String|false} chatId
           * @param {Object} options
           */
          m.quoted.reply = (text, chatId, options) => msgsz.reply(chatId ? chatId : m.chat, text, vM, options)
        //  m.quoted.reply2 = (text, chatId, options) => msgsz.reply2(chatId ? chatId : m.chat, text, vM, options)

          /**
           * Copy quoted message
           */
          m.quoted.copy = () => exports.smsg(msgsz, M.fromObject(M.toObject(vM)))

          /**
           * Forward quoted message
           * @param {String} jid
           *  @param {Boolean} forceForward
          */
          m.quoted.forward = (jid, forceForward = false) => msgsz.forwardMessage(jid, vM, forceForward)

          /**
           * Exact Forward quoted message
           * @param {String} jid
           * @param {Boolean|Number} forceForward
           * @param {Object} options
          */
          m.quoted.copyNForward = (jid, forceForward = true, options = {}) => msgsz.copyNForward(jid, vM, forceForward, options)

          /**
           * Modify quoted Message
           * @param {String} jid
           * @param {String} text
           * @param {String} sender
           * @param {Object} options
          */
          m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => msgsz.cMod(jid, vM, text, sender, options)

          /**
           * Delete quoted message
           */
          m.quoted.delete = () => msgsz.sendMessage(m.quoted.chat, { delete: vM.key })
      }
  }
  m.name = !nullish(m.pushName) && m.pushName || msgsz.getName(m.sender)
  if (m.msg && m.msg.url) m.download = (saveToFile = false) => msgsz.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
  




   /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
    m.reply = async (text, chatId, options) => {

//        if (global.replyimage === 'random') {

    let pp = await msgsz.profilePictureUrl(m.sender, 'image').catch(_ => global.profileimage)

      let { data } = await msgsz.getFile(await(await require('node-fetch')(pp)).buffer())

      msgsz.reply(chatId ? chatId : m.chat, text, m, { contextInfo: { mentionedJid: msgsz.parseMention(text), externalAdReply: { title: global.linkname, body: global.linktext, sourceUrl: global.linkurl, thumbnail: data }}, options })
//    }




//     else 
//     { 
//       let data = await (await fetch(replyimage)).buffer()

     // let { data } = await msgsz.getFile(await(await require('node-fetch')(global.replyimage)).buffer())

//        msgsz.reply(chatId ? chatId : m.chat, text, m, { contextInfo: { mentionedJid: msgsz.parseMention(text), externalAdReply: { title: global.linkname, body: global.linktext, sourceUrl: global.linkurl, thumbnail: data }}, options })

//     }


  }
  m.name = m.pushName || msgsz.getName(m.sender)
  if (m.msg && m.msg.url) m.download = () => msgsz.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''))
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(msgsz, M.fromObject(M.toObject(m)))

  /**
   * Forward this message
   * @param {String} jid
   * @param {Boolean} forceForward
   */
  m.forward = (jid = m.chat, forceForward = false) => msgsz.copyNForward(jid, m, forceForward)

  /**
   * Exact Forward this message
   * @param {String} jid
   * @param {Boolean} forceForward
   * @param {Object} options
   */
  m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => msgsz.copyNForward(jid, m, forceForward, options)

  /**
   * Modify this Message
   * @param {String} jid 
   * @param {String} text 
   * @param {String} sender 
   * @param {Object} options 
   */
  m.cMod = (jid, text = '', sender = m.sender, options = {}) => msgsz.cMod(jid, m, text, sender, options)

  /**
   * Delete this message
   */
  m.delete = () => msgsz.sendMessage(m.chat, { delete: m.key })





/**
 * generateThumbnail
 * @param {String} file 
 * @param {*} mediaType 
 * @param {*} info 
 */
async function generateThumbnail(file, mediaType, info) {
  const alternate = (Buffer.alloc(1)).toString('base64')
  if ('thumbnail' in info) {
    // don't do anything if the thumbnail is already provided, or is null
    if (mediaType === MessageType.audio) {
      throw new Error('audio messages cannot have thumbnails')
    }
  } else if (mediaType === MessageType.image) {
    try {
      const buff = await compressImage(file)
      info.thumbnail = buff.toString('base64')
    } catch (err) {
      console.error(err)
      info.thumbnail = alternate
    }
  } else if (mediaType === MessageType.video) {
    const imgFilename = path.join(tmpdir(), generateMessageID() + '.jpg')
    try {
      try {
        await extractVideoThumb(file, imgFilename, '00:00:00', { width: 48, height: 48 })
        const buff = await fs.promises.readFile(imgFilename)
        info.thumbnail = buff.toString('base64')
        await fs.promises.unlink(imgFilename)
      } catch (e) {
        console.error(e)
        info.thumbnail = alternate
      }
    } catch (err) {
      console.log('could not generate video thumb: ' + err)
    }
  }
}









  try {
      msgsz.saveName(m.sender, m.name)
      msgsz.pushMessage(m)
      if (m.isGroup) msgsz.saveName(m.chat)
      if (m.msg && m.mtype == 'protocolMessage') msgsz.ev.emit('message.delete', m.msg.key)
  } catch (e) {
      console.error(e)
  }
  return m
}

exports.logic = (check, inp, out) => {
  if (inp.length !== out.length) throw new Error('Input and Output must have same length')
  for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
  return null
}

exports.proto = () => {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
      const ab = new ArrayBuffer(this.length);
      const view = new Uint8Array(ab);
      for (let i = 0; i < this.length; ++i) {
          view[i] = this[i];
      }
      return ab;
  }
  /**
   * @returns {ArrayBuffer}
   */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
      return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  /**
   * @returns {Buffer}
   */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
      return Buffer.from(new Uint8Array(this))
  }
  /**
   * @returns {Boolean}
   */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toFormat = ArrayBuffer.prototype.toFormat = Object.prototype.toFormat = Array.prototype.toFormat = function toFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
      const { fileTypeFromBuffer } = await import('file-type')
      return await fileTypeFromBuffer(this)
  }
}

function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
}

function rand(isi) {
  return isi[Math.floor(Math.random() * isi.length)]
}

/**
* ??
* @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
* @returns {boolean}
*/
function nullish(args) {
  return !(args !== null && args !== undefined)
}


async function generateProfilePicture(buffer) {
let jimp = await jimp_1.read(buffer)
let min = jimp.getWidth()
let max = jimp.getHeight()
let cropped = jimp.crop(0, 0, min, max)
return {
  img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
  preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
}
}
