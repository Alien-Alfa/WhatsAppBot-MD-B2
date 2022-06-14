process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
require('./config')
const {
  useSingleFileAuthState,
  DisconnectReason
} = require('@adiwajshing/baileys')
const { generate } = require('qrcode-terminal')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const pino = require('pino')
const os = require('os')
let simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
const {MakeSession} =require ('./lib/client')

global.authFile = `session.alfa.json`

let remsession = global.session

  if(!fs.existsSync('./session.alfa.json')) {
  MakeSession(`${remsession}`,authFile)
  }
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.msgsz, ...args) }
global.timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())







global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

//global.prefix = new RegExp('^', 'gi')









global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// if (opts['cluster']) {
//   require('./lib/cluster').Cluster()
// }


console.log(require('chalk').redBright('Waiting 3 seconds to Generate your session file'))
setTimeout(() => {

if(!fs.existsSync('./session.alfa.json')) process.send('forever restart') 
global.isInit = !fs.existsSync(authFile)
const { state, saveState } = useSingleFileAuthState(global.authFile)
//process.send('forever restart') 
//if(!fs.existsSync('./session.alfa.json')) process.send('forever restart') 
console.log(require('chalk').redBright('Process Exited: No authFile'))
//setTimeout(() => { process.send('reset') }, 18000000)


const connectionOptions = {
  version: [2, 2204, 13],
  logger: pino({ level: 'silent' }),
  printQRInTerminal: true,
  auth: state,
   getMessage: async key => {
     return {
       conversation: 'ʀᴇᴄᴏɴɴᴇᴄᴛᴇᴅ 🎈'
     }
   }
  //logger: P({ level: 'silent' })
}

global.msgsz = simple.makeWASocket(connectionOptions)

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

async function connectionUpdate(update) {
  console.log(require('chalk').green('Activating the Bot, Please wait a moment......'))
  const { connection, lastDisconnect } = update
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && msgsz.ws.readyState !== WebSocket.CONNECTING) {
    console.log(global.reloadHandler(true))
  }
  if (global.db.data == null) await loadDatabase()
  console.log(JSON.stringify(update, null, 4))
}


process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

const imports = (path) => {
  path = require.resolve(path)
  let modules, retry = 0
  do {
    if (path in require.cache) delete require.cache[path]
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  let handler = imports('./handler')
  if (restatConn) {
    try { global.msgsz.ws.close() } catch { }
    global.msgsz = {
      ...global.msgsz, ...simple.makeWASocket(connectionOptions)
    }
  }


  if (!isInit) {
    msgsz.ev.off('messages.upsert', msgsz.handler)
    msgsz.ev.off('group-participants.update', msgsz.participantsUpdate)
    msgsz.ev.off('message.delete', msgsz.onDelete)
    msgsz.ev.off('connection.update', msgsz.connectionUpdate)
    msgsz.ev.off('creds.update', msgsz.credsUpdate)
  }

  msgsz.welcome = 'Hello @user!\nWelcome to the group \n@subject\n\n@desc'
  msgsz.bye = 'Goodbye @user!\nIf you come back, take a look!'
  msgsz.spromote = '@user now admin!\n'
  msgsz.sdemote = '@user now not admin !\n'
  msgsz.handler = handler.handler.bind(msgsz)
  msgsz.participantsUpdate = handler.participantsUpdate.bind(msgsz)
  msgsz.onDelete = handler.delete.bind(msgsz)
  msgsz.connectionUpdate = connectionUpdate.bind(msgsz)
  msgsz.credsUpdate = saveState.bind(msgsz)

  msgsz.ev.on('messages.upsert', msgsz.handler)
  msgsz.ev.on('group-participants.update', msgsz.participantsUpdate)
  msgsz.ev.on('message.delete', msgsz.onDelete)
  msgsz.ev.on('connection.update', msgsz.connectionUpdate)
  msgsz.ev.on('creds.update', msgsz.credsUpdate)
  isInit = false
  return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    msgsz.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) msgsz.logger.info(`re - require plugin '${filename}'`)
      else {
        msgsz.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else msgsz.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) msgsz.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      msgsz.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()





// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
    cp.spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) msgsz.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) msgsz.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) msgsz.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => msgsz.logger.info('Quick Test Done'))
  .catch(console.error)


function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
}, 3000)