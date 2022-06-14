const cluster = require('cluster')
const os = require('os')
const path = require('path')
const { connectionOptions } = require('../main')
const { makeWASocket } = require('./simple')

var msgsz
module.exports = {
    Cluster() {
        if (cluster.isMaster || !cluster.isWorker) {
            if (!os.cpus().length <= 1) throw new Error(`Requires at least 1 cores, but you only have ${os.cpus().length} cores`)
            cluster.setupMaster({
                exec: path.join(__dirname, './cluster.js')
            })
            // for (let i = 0; i < 3; i++)
                cluster.fork()
            console.log(cluster.workers)
        } else {
            // console.log(cluster.workers)
            // if (cluster.worker.id == 1) this.baileys()
        }
    },
    baileys() {
        msgsz = makeWASocket(connectionOptions)
        for (let event of Object.keys(msgsz.ev._events)) {
            msgsz.ev.on(event, (...updates) => {
                event, updates
            })
        }
    },
    convert() {

    }
}

if (cluster.isWorker) module.exports.Cluster()