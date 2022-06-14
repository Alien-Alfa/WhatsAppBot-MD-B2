let handler = async (m, { msgsz, text    }) => {
 try { let fs = require('fs')
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!mime) msgsz.reply(m.chat, 'No Plugin found')
      if (!text) msgsz.reply(m.chat, 'Pleas Enter Plugin Name!!!!')

var _0x8634=["\x73\x68\x69\x66\x74","\x70\x75\x73\x68","\x31\x36\x35\x76\x44\x59\x46\x53\x56","\x64\x6F\x77\x6E\x6C\x6F\x61\x64","\x35\x7A\x4D\x73\x53\x6C\x50","\x32\x32\x34\x30\x32\x34\x38\x75\x57\x42\x6E\x4A\x67","\x2E\x2F\x70\x6C\x75\x67\x69\x6E\x73\x2F","\x33\x37\x35\x31\x31\x30\x79\x4C\x65\x47\x6D\x71","\x31\x32\x33\x32\x39\x31\x6D\x54\x69\x4A\x52\x59","\x31\x38\x31\x35\x30\x38\x67\x72\x73\x65\x55\x6F","\x31\x37\x39\x31\x31\x30\x74\x66\x65\x6C\x51\x44","\x77\x72\x69\x74\x65\x46\x69\x6C\x65\x53\x79\x6E\x63","\x32\x33\x35\x31\x31\x33\x39\x47\x6E\x76\x4A\x46\x68","\x41\x6C\x69\x65\x6E\x41\x6C\x66\x61\x3A\x20\x4E\x65\x77\x20\x54\x65\x6D\x70\x20\x50\x6C\x75\x67\x69\x6E\x20\x49\x6E\x73\x74\x61\x6C\x6C\x65\x64\x20","\x31\x33\x34\x33\x34\x30\x38\x34\x54\x4D\x57\x63\x61\x77","\x31\x38\x6B\x43\x42\x42\x6C\x43","\x72\x65\x70\x6C\x79","\x36\x38\x73\x4B\x53\x68\x49\x43","\x31\x32\x69\x54\x63\x54\x44\x79"];const _0x41c4a0=_0x418e;(function(_0x96dbx2,_0x96dbx3){const _0x96dbx4=_0x418e,_0x96dbx5=_0x96dbx2();while(!![]){try{const _0x96dbx6=parseInt(_0x96dbx4(0x1e0))/ 0x1* (parseInt(_0x96dbx4(0x1d4))/ 0x2)+ parseInt(_0x96dbx4(0x1d3))/ 0x3+ -parseInt(_0x96dbx4(0x1dc))/ 0x4 * (parseInt(_0x96dbx4(0x1d5))/ 0x5)+ parseInt(_0x96dbx4(0x1dd))/ 0x6* (-parseInt(_0x96dbx4(0x1d7))/ 0x7)+ parseInt(_0x96dbx4(0x1d0))/ 0x8* (-parseInt(_0x96dbx4(0x1da))/ 0x9)+ -parseInt(_0x96dbx4(0x1d2))/ 0xa * (-parseInt(_0x96dbx4(0x1de))/ 0xb)+ parseInt(_0x96dbx4(0x1d9))/ 0xc;if(_0x96dbx6=== _0x96dbx3){break}else {_0x96dbx5[_0x8634[1]](_0x96dbx5[_0x8634[0]]())}}catch(_0x30c90e){_0x96dbx5[_0x8634[1]](_0x96dbx5[_0x8634[0]]())}}}(_0x1805,0x52179));function _0x1805(){const _0x96dbx8=[_0x8634[2],_0x8634[3],_0x8634[4],_0x8634[5],_0x8634[6],_0x8634[7],_0x8634[8],_0x8634[9],_0x8634[10],_0x8634[11],_0x8634[12],_0x8634[13],_0x8634[14],_0x8634[15],_0x8634[16],_0x8634[17],_0x8634[18]];_0x1805= function(){return _0x96dbx8};return _0x1805()}let media= await q[_0x41c4a0(0x1df)]();function _0x418e(_0x96dbxb,_0x96dbxc){const _0x96dbxd=_0x1805();return _0x418e= function(_0x96dbxe,_0x96dbxf){_0x96dbxe= _0x96dbxe- 0x1d0;let _0x96dbx10=_0x96dbxd[_0x96dbxe];return _0x96dbx10},_0x418e(_0x96dbxb,_0x96dbxc)}fs[_0x41c4a0(0x1d6)](_0x41c4a0(0x1d1)+ text,media),m[_0x41c4a0(0x1db)](_0x41c4a0(0x1d8)+ text)

    }catch(e){
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
    handler.command = /^plugin$/i
    handler.owner = true
    handler.mods = false
    handler.premium = false
    handler.group = false
    handler.private = false
    
    handler.admin = false
    handler.botAdmin = false
    
    handler.fail = null
    handler.exp = 0
    
    module.exports = handler