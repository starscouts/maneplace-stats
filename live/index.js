const { WebSocketServer } = require('ws');
const uuid = require('uuid-v4');
const fs = require('fs');

let eventsPath = "/dev/shm/maneplace-re-0.json";
let usersPath = "/dev/shm/maneplace-rusers.json";

let eventsData = JSON.parse(fs.readFileSync(eventsPath).toString());
let usersData = JSON.parse(fs.readFileSync(usersPath).toString());

fs.watchFile(eventsPath, () => {
    eventsData = JSON.parse(fs.readFileSync(eventsPath).toString());
});

fs.watchFile(usersPath, () => {
    usersData = JSON.parse(fs.readFileSync(usersPath).toString());
});

const wss = new WebSocketServer({ port: 29188 })
let connections = {};

wss.on('connection', function connection (ws) {
    let id = uuid();
    connections[id] = ws;

    ws.on('close', function message(data) {
        delete connections[id];
    });
});

setInterval(() => {
    Object.values(connections).map((ws) => {
        ws.send(JSON.stringify({
            pixels: eventsData.length,
            users: usersData.length,
            average: Math.round(eventsData.length / usersData.length)
        }));
    })
}, 500);