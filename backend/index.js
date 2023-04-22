const osUtils = require('node-os-utils')
const config = require('./config')
const ws = require("ws")

const wss = new ws.Server({ port: 42069 }, () => {
    console.log("SERVER STARTED");
    updateStats();
})

var users = {};

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
        console.clear()
        console.log(`Updated on ${new Date().toTimeString()}`)
    }, 1000)
}

// (B) ON CLIENT CONNECT
wss.on("connection", (socket, req) => {
    // (B1) REGISTER CLIENT
    let id = 0;
    while (true) {
        if (!users.hasOwnProperty(id)) { users[id] = socket; break; }
        id++;
    }

    // (B3) FORWARD MESSAGE TO ALL ON RECEIVING MESSAGE
    socket.on("message", msg => {
        let message = msg.toString().replace(/(<([^>]+)>)/gi, "");
        for (let u in users) { users[u].send(message); }
    });

    const userLoop = setInterval(()=>{
        socket.send(JSON.stringify({cpuUsage: stats.cpuUsage, memUsage: stats.memUsage, uptime: stats.uptime}))
    }, 1000)


    // (B2) DEREGISTER CLIENT ON DISCONNECT
    socket.on("close", () => {delete users[id]; delete userLoop});
});