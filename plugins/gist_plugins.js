


const got = require('got');
const fs = require('fs');
const Db = require('./sql/plugin');


let handler = async (m, { text, msgsz, isOwner }) => {


if (!text) msgsz​.​reply​(​m​.​chat​, ​' No Plugin Found \n\n Example: .install https://gist.github.com/alien-alfa/'​, ​m​)
try {
    var url = new URL(text);
} catch {
    msgsz​.​reply​(​m​.​chat​, `INVALID_URL`,m );
}
if (url.host === 'gist.github.com') {
    url.host = 'gist.githubusercontent.com';
    url = url.toString() + '/raw'
} else {
    url = url.toString()
}
var response = await got(url);
if (response.statusCode == 200) {

   msgsz.reply(m.chat, 'Testing In progress Please Wait...', m)
    // Plugin Name
    var plugin_name = response.body.match(/handler.help\= ["'](.*)["'].*}/);
    if (plugin_name.length >= 1) {
        plugin_name = "alfa" + plugin_name[1];
    } else {
        plugin_name = "alfa" + Math.random().toString(36).substring(8);
    }

    fs.writeFileSync('./plugins/' + plugin_name + '.js', response.body);
    try {
        require('./' + plugin_name);
    } catch (e) {
        fs.unlinkSync('./plugins/' + plugin_name + '.js')
        msgsz​.​reply​(​m​.​chat​, `INVALID_URL`,m );
    }
    var DEG = { level: 5 }
    if (response.body.includes('fs.')) DEG.level = DEG.level + 8
    if (response.body.includes('message.client.user.name')) DEG.level = DEG.level + 6
    if (response.body.includes('Buffer')) DEG.level = DEG.level + 14
    if (response.body.includes("require('fs')")) DEG.level = DEG.level + 9
    if (response.body.includes('quotedMessage')) DEG.level = DEG.level + 5
    if (response.body.includes('fs.unlinkSync')) DEG.level = DEG.level + 16
    if (response.body.includes('findAll')) DEG.level = DEG.level + 20
    if (response.body.includes('MessageType.location')) DEG.level = DEG.level + 9
    if (response.body.includes('message.client.user.jid')) DEG.level = DEG.level + 8
    if (response.body.includes('exec')) DEG.level = DEG.level + 14
    if (response.body.includes('setMessage')) DEG.level = DEG.level + 22
    if (response.body.includes('/sql/notes') || response.body.includes('/sql/lydia') || response.body.includes('/sql/plugin') || response.body.includes('/sql/greetings') || response.body.includes('/sql/filters')) DEG.level = DEG.level + 33
    if (response.body.includes('neofetch')) DEG.level = DEG.level + 12
    if (response.body.includes('groupMetadata')) DEG.level = DEG.level + 29
    if (response.body.includes('similarity')) DEG.level = DEG.level + 18
    if (response.body.includes('format')) DEG.level = DEG.level + 26
    var plugins = await Db.PluginDB.findAll()
    var find = '';
    await plugins.map((plugin) => { find += plugin.dataValues.name })
    if (find.includes(plugin_name)) {
        await msgsz​.​reply​(​m​.​chat​, `duplicate`, m)
        await new Promise(r => setTimeout(r, 400))
        fs.unlinkSync('./plugins/' + plugin_name + '.js')
    }
    else if (response.body.includes('formation') && !text.includes('phaticusthiccy')) {
        await msgsz​.​reply​(​m​.​chat​, `harmful`, m)
        await new Promise(r => setTimeout(r, 400))
        fs.unlinkSync('./plugins/' + plugin_name + '.js')
    } 
    else if ((response.body.includes('commands.map') || response.body.includes('PluginDB') || response.body.includes('groupRemove') || response.body.includes('groupAdd') || response.body.includes('groupMakeAdmin') || response.body.includes('groupDemoteAdmin') || response.body.includes('groupSettingChange') || response.body.includes('groupInviteCode') || response.body.includes('Math.round((new Date()).getTime() / 1000)') || response.body.includes('https://thiccyscarbonapi.herokuapp.com/?code=') || response.body.includes('filtreler.map') || response.body.includes('heroku.delete') || response.body.includes('heroku.patch') || response.body.includes('Chrome/80.0.3987.149 Mobile Safari/537.36') || response.body.includes('groupLeave') || response.body.includes('updateProfilePicture') || response.body.includes('blockUser') || response.body.includes("Language.getString('system_stats')") || response.body.includes("commits['all'].map") || response.body.includes('await git.fetch') || response.body.includes('jids.push')) && !text.includes('phaticusthiccy')) {
        await msgsz​.​reply​(​m​.​chat​, `imside`, m)
        await new Promise(r => setTimeout(r, 400))
        fs.unlinkSync('./plugins/' + plugin_name + '.js')
    } 
    else {
        if (!text.includes('phaticusthiccy') && DEG.level > 99) {
            await msgsz​.​reply​(​m​.​chat​, `limit` + DEG.level + '_', m)
            fs.unlinkSync('./plugins/' + plugin_name + '.js')
        }
         if (!text.includes('afnanplk') && DEG.level > 99) {
            await msgsz​.​reply​(​m​.​chat​, `limit` + DEG.level + '_', m)
            fs.unlinkSync('./plugins/' + plugin_name + '.js')
        }
        else if (!text.includes('phaticusthiccy') || (!text.includes('afnanplk') && DEG.level < 100)) {
            await Db.installPlugin(url, plugin_name)
            await new Promise(r => setTimeout(r, 400))
            await msgsz​.​reply​(​m​.​chat​, `UNOFF`, m)
            await new Promise(r => setTimeout(r, 400))
            await msgsz​.​reply​(​m​.​chat​, `unaffinfo` + DEG.level + '_', m)
        }
        else {
            await new Promise(r => setTimeout(r, 400))
            await Db.installPlugin(url, plugin_name)
            await msgsz​.​reply​(​m​.​chat​, `INSTALLED`, m)
        }
    }
}
}
handler.help1 = ['instplug']

handler.help = ['plugin'].map(v => v + '')
handler.tags = ['base']
handler.command = /^install$/i

module.exports = handler