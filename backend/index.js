const express = require('express');
const cors = require('cors');
const osUtils = require('node-os-utils')
const bodyParser = require('body-parser');
const config = require('./config')

const app = express();

app.use(bodyParser.json());
app.use(cors());

var stats = {
    cpuUsage: 0,
    memUsage: 0,
    uptime: 0,
}

function setCpuUsage(value) {
    stats.cpuUsage = value
}

function setMemUsage(value) {
    stats.memUsage = value
}

function setUptime(value) {
    stats.uptime = value
}

async function updateStats() {
    setInterval(() => {
        osUtils.cpu.usage().then(setCpuUsage)
        osUtils.mem.used().then(setMemUsage)
        setUptime(osUtils.os.uptime())
    }, 1000)
}

app.get('/', (req,res) => {
    console.log(stats.memUsage.usedMemMb/stats.memUsage.totalMemMb)

    res.send(
        `
        |CPU usage is ${stats.cpuUsage}%\n
        |MEM usage is ${stats.memUsage.usedMemMb}MB / ${stats.memUsage.totalMemMb}MB (${((stats.memUsage.usedMemMb/stats.memUsage.totalMemMb)*100).toFixed(2)}%)\n
        |Uptime: ${(stats.uptime/3600).toFixed(1)}h
        `
    );
})

app.listen(config.port, () => {
    console.log(`App started on port ${config.port}`)
    updateStats()
})

