const osUtils = require('node-os-utils')
const config = require('./config')
const ws = require("ws")
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');


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

function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};

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
        // console.clear()
        // console.log(`Updated on ${new Date().toTimeString()}`)
    }, 1000)
}

// (B) ON CLIENT CONNECT
wss.on("connection", (socket, req) => {
    // (B1) REGISTER CLIENT
    let id = 0;
    // console.log(users)
    console.log(req)
    while (true) {
        // console.log(users)
        if (!users.hasOwnProperty(id)) { users[id] = socket; break; }
        id++;
    }

    // (B3) FORWARD MESSAGE TO ALL ON RECEIVING MESSAGE
    socket.on("message", msg => {
        // let message = msg.toString().replace(/(<([^>]+)>)/gi, "");
        // for (let u in users) { users[u].send(message); }
        console.log(msg.toString())
        let data = JSON.parse(msg.toString())

        console.log(data)
        if(data.type==="CLIENT_FILE_EXPLORER") console.log(data.id)

        fs.readdir(data.pwd, (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            let directoryListing = files.map((file) => {
                let fileData = fs.lstatSync(path.join(data.pwd, file))
                let splitted = file.split(".")
                let extension = splitted.length===1 ? null : splitted[0].length < 1 ? null : splitted[splitted.length-1]    

                return {
                    fileName: file,
                    fileExtension: extension,
                    filePermissions: (fileData.mode&07777).toString(8),
                    isDirectory: fileData.isDirectory(),
                    isFile: fileData.isFile(),
                    isSymLink: fileData.isSymbolicLink()
                };
            })

            console.log(directoryListing)
            socket.send(JSON.stringify({
                type: "SERVER_FILE_EXPLORER",
                id: data.id,
                data: {
                    status: "SUCCESS",
                    directory: data.pwd,
                    files: directoryListing
                }
            }))
        });
    });

    const userLoop = setInterval(()=>{
        socket.send(JSON.stringify({
            type: "SERVER_CLOCK",
            clock: {
                time: formatDate(new Date(), "HH:mm"),
                date: formatDate(new Date(), "dd.MM.yyyy")
            }
        }))
    }, 1000)


    // (B2) DEREGISTER CLIENT ON DISCONNECT
    socket.on("close", () => {delete users[id]; delete userLoop});
});