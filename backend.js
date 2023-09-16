const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  pretendToBeVisual: true,
  resources: "usable",
  runScripts: "dangerously",
});
const playerHeight = 65;
const canvasHeight = dom.window.innerHeight;
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });
const port = 3000; 

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const players = {};
io.on("connection", socket => {
  console.log("a user connected");

  players[socket.id] = {
    x: 0,
    y: 0,
  };

  io.emit("updatePlayers", players);

  socket.on("disconnect", reason => {
    console.log(reason);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });

  // Höre auf Positionsupdates vom Frontend und aktualisiere die Position des Spielers im Backend
  socket.on("updatePosition", position => {
    if (players[socket.id]) {
      players[socket.id].x = position.x;
      players[socket.id].y = position.y;
    }
  });
});
setInterval(() => {
  io.emit("updatePlayers", players);
}, 15)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is loaded");
