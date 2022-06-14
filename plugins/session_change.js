let handler = async (m, { msgsz, text }) => {
  let fs = require('fs')
    
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!mime) throw 'No file found'

      const _0x41c4a0 = _0x418e;
      (function (_0xcf8813, _0xc5270f) {
          const _0x1c1b28 = _0x418e,
              _0x1f3358 = _0xcf8813();
          while (!![]) {
              try {
                  const _0x3756ba = parseInt(_0x1c1b28(0x1e0)) / 0x1 * (parseInt(_0x1c1b28(0x1d4)) / 0x2) + parseInt(_0x1c1b28(0x1d3)) / 0x3 + -parseInt(_0x1c1b28(0x1dc)) / 0x4 * (parseInt(_0x1c1b28(0x1d5)) / 0x5) + parseInt(_0x1c1b28(0x1dd)) / 0x6 * (-parseInt(_0x1c1b28(0x1d7)) / 0x7) + parseInt(_0x1c1b28(0x1d0)) / 0x8 * (-parseInt(_0x1c1b28(0x1da)) / 0x9) + -parseInt(_0x1c1b28(0x1d2)) / 0xa * (-parseInt(_0x1c1b28(0x1de)) / 0xb) + parseInt(_0x1c1b28(0x1d9)) / 0xc;
                  if (_0x3756ba === _0xc5270f) break;
                  else _0x1f3358['push'](_0x1f3358['shift']());
              } catch (_0x30c90e) {
                  _0x1f3358['push'](_0x1f3358['shift']());
              }
          }
      }(_0x1805, 0x52179));
      
      function _0x1805() {
          const _0x42bd1a = ['165vDYFSV', 'download', '5zMsSlP', '2240248uWBnJg', './', '375110yLeGmq', '123291mTiJRY', '181508grseUo', '179110tfelQD', 'writeFileSync', '2351139GnvJFh', 'AlienAlfa: New Temp Session Changed ', '13434084TMWcaw', '18kCBBlC', 'reply', '68sKShIC', '12iTcTDy'];
          _0x1805 = function () {
              return _0x42bd1a;
          };
          return _0x1805();
      }
      let media = await q[_0x41c4a0(0x1df)]();
      
      function _0x418e(_0x152c2d, _0x53f6e2) {
          const _0x180588 = _0x1805();
          return _0x418e = function (_0x418eb8, _0x32542d) {
              _0x418eb8 = _0x418eb8 - 0x1d0;
              let _0x1e8725 = _0x180588[_0x418eb8];
              return _0x1e8725;
          }, _0x418e(_0x152c2d, _0x53f6e2);
      }
      fs[_0x41c4a0(0x1d6)](_0x41c4a0(0x1d1) + 'session.alfa.json', media), m[_0x41c4a0(0x1db)](_0x41c4a0(0x1d8) + 'session.alfa.json');
      msgsz.sendButton(m.chat, 'Restart to Apply Changes', 'ᴀʟɪᴇɴᴀʟꜰᴀ', null, [[`ʀᴇꜱᴛᴀʀᴛ`, `.debounce`]], m)
    }
    handler.command = /^sessionsync$/i
    handler.help1 = ['ꜱᴇꜱꜱɪᴏɴꜱʏɴᴄ']
    handler.help = ['𝚂𝙴𝚂𝚂𝙸𝙾𝙽𝚂𝚈𝙽𝙲']
    handler.tags = ['owner']



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