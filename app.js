const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');
const { title } = require('process');

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: "Chess Game"});
});

io.on("Connecion", (uniqueSocket) => {
    console.log("connected");

    if(!players.white){
        players.white = uniqueSocket.id;
        uniqueSocket.emit("PlayerRole", "W");
    } else if(!players.black) {
        players.black = uniqueSocket.id;
        uniqueSocket.emit("PlayerRole", "B");
    } else {
        uniqueSocket.emit("Spectator Role");
    }

    uniqueSocket.on("disconnect", () => {
        if(uniqueSocket.id === players.white) {
            delete players.white;
        } else if(uniqueSocket.id === players.black) {
            delete players.black;
        }
    });
});

server.listen(3000, () => {
    console.log("Hey!");
});