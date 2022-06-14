/* Copyright (C) 2022 Neeraj Krishna.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Millie WhatsApp Bot - Neeraj-x0
*/

const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI({
  'api_dev_key' : '5f4ilKJVJG-0xbJTXesajw64LgSAAo-L',
  'api_user_name' : 'alienalfa',
  'api_user_password' : 'AlienAlfa.yt'
 });
 module.exports = {

async  MakeSession(session_id,authFile) {
pastebin.getPaste(atob(session_id)).then(function (data) {
        if (!fs.existsSync(authFile)){
          fs.writeFileSync(authFile,data)}
      })
      .fail(function (err) {
        console.log(err);
      })  
}

 }
 // Thanks to Neeraj Krishna.