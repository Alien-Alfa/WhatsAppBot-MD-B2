



const { exec, spawn, execSync } = require("child_process")
let handler = async (m, { msgsz, action, command, text }) => {




var dope = command.trimStart()  + ' ' + text.trimEnd()

switch (action) {

//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
    
    
    
    
            
case 'setvar': {
    if (!isCreator) return conn.reply(m.chat, mess.owner)
    if (herokuapi === false) { conn.reply(m.chat, `ʏᴏᴜ ʜᴀᴠᴇɴ'ᴛ ꜱᴇᴛᴜᴘ ʜᴇʀᴏᴋᴜ ᴀᴘɪ ᴋᴇʏ ʏᴇᴛ!`) }
else {     
    
let configvar = text.split(":")[0]
let configvalue = text.split(":")[1]


    exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku config:set'+` ${configvar}=${configvalue} --app ${herokuapp}`, (err, stdout) => {
        if(err) return conn.reply(m.chat, '```wrong format```\n\n Example: .setvar BOTNAME:AlienAlfa')
        if (stdout) return conn.reply(m.chat, '```Setvar: ```'+stdout)
    })
}}
break    

//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	

        case 'delvar': {
    if (!isCreator) return conn.reply(m.chat, mess.owner)
    if (herokuapi === false) { conn.reply(m.chat, `ʏᴏᴜ ʜᴀᴠᴇɴ'ᴛ ꜱᴇᴛᴜᴘ ʜᴇʀᴏᴋᴜ ᴀᴘɪ ᴋᴇʏ ʏᴇᴛ!`) }
else {     
    
let configvar = text.split(":")[0]


    exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku config:unset'+` ${configvar} --app ${herokuapp}`, (err, stdout) => {
        if(err) return conn.reply(m.chat, '```wrong format```\n\n Example: .delvar BOTNAME')
        if (stdout) return conn.reply(m.chat, '```Delvar: ```'+stdout)
    })
}}
break    

//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
        



                    case 'res': {
    if (!isCreator) return conn.reply(m.chat, mess.owner)
    if (!text) throw 'example res appname.apikey'
    
let herokuapp = text.split(".")[0]
let herokuapi = text.split(".")[1]


    exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku restart --app'+` ${herokuapp}`, (err, stdout) => {
        if(err) return conn.reply(m.chat, 'invalid arguments')
        if (stdout) return conn.reply(m.chat, stdout)
    })
}
break    


//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	



//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
case 'restart': {
				
    if (herokuapi === false) { conn.reply(m.chat, `ʏᴏᴜ ʜᴀᴠᴇɴ'ᴛ ꜱᴇᴛᴜᴘ ʜᴇʀᴏᴋᴜ ᴀᴘɪ ᴋᴇʏ ʏᴇᴛ!`) }
    else {
        
        if (!isCreator) throw mess.owner 
        let buttons = [

                { buttonId: 'confrestart', buttonText: { displayText: 'ᴄᴏɴꜰɪʀᴍ ʀᴇꜱᴛᴀʀᴛ'  }, type: 2 }
            ]
            await msgsz.sendButtonText(m.chat, buttons, `Restart This Bot`, `${alfafooter}\nᴀʟɪᴇɴ ᴀʟꜰᴀ-ᴍᴅ`, m)
    } }
    break
//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
                            case 'confrestart': {
            if (!isCreator) return conn.reply(m.chat, mess.owner)
            exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku restart --app'+` ${herokuapp}`, (err, stdout) => {
                if(err) return conn.reply(m.chat, '```Sorry Unknown Error```')
                if (stdout) return conn.reply(m.chat, stdout)
            })
           conn.reply(m.chat, '```Restarting...```')
        }
    break
//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
                case 'dyno': {
            if (!isCreator) return conn.reply(m.chat, mess.owner)
            exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku ps --app'+` ${herokuapp}`, (err, stdout) => {
                if(err) return conn.reply(m.chat, '```Sorry Unknown Error```\n*Manual restart Required*')
                if (stdout) return conn.reply(m.chat, stdout)
            })
             conn.reply(m.chat, '```Gathering Info...```')
        }
    break
//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
              case 'terminate': case 'shutdown': { 
                    
    if (herokuapi === false) { conn.reply(m.chat, `ʏᴏᴜ ʜᴀᴠᴇɴ'ᴛ ꜱᴇᴛᴜᴘ ʜᴇʀᴏᴋᴜ ᴀᴘɪ ᴋᴇʏ ʏᴇᴛ!`) }
    else {
        
        if (!isCreator) throw mess.owner 
        let buttons = [

                { buttonId: 'confshutdown', buttonText: { displayText: 'ᴄᴏɴꜰɪʀᴍ ꜱʜᴜᴛᴅᴏᴡɴ'  }, type: 2 }
            ]
            await msgsz.sendButtonText(m.chat, buttons, `ShutDown This Bot`, `${alfafooter}\nᴀʟɪᴇɴ ᴀʟꜰᴀ-ᴍᴅ`, m)
    } }
    break
//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	
           case 'confshutdown': {
            if (!isCreator) return conn.reply(m.chat, mess.owner)
            exec('HEROKU_API_KEY='+`${herokuapi} `+'heroku ps:scale worker=0 --app'+` ${herokuapp}`, (err, stdout) => {
                if(err) return conn.reply(m.chat, '```Sorry Unknown Error```\n*Manual ShutDown Required*')
                if (stdout) return conn.reply(m.chat, stdout)
            }) 
            conn.reply(m.chat, '```Shuting down...```')
        }
    break
    
//|⬡════════════════════════════════════════════|❝ Ⓒ𝙰𝙻𝙸𝙴𝙽 𝙰𝙻𝙵𝙰 𝙱𝙾𝚃 𝙱𝚈 𝚃𝙾𝚇𝙸𝙲 𝙰𝙻𝙸𝙴𝙽™ ❞|═══════════════════════════════════════════⬡|//	


    }
}

handler.help = ['heroku']
handler.tags = ['advanced']

handler.customPrefix = /^[]/
//handler.command = new RegExp


//handler.customPrefix = /^!$/i
handler.command = new RegExp

handler.rowner = true
module.exports = handler