const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const socket = io();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const wintercabin1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  frameRate: 4,
  frameBuffer: 100,
  loop: true,
  imageSrc: "./textures/wintercabin1/wintercabin1.png",
});

//   imageSrc: "./textures/characters/character1/normal/idleRight.png",
//   frameRate: 4,
//   animations: {
//     idleRight: {
//       frameRate: 4,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/idleRight.png",
//     },
//     idleLeft: {
//       frameRate: 4,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/idleLeft.png",
//     },
//     runRight: {
//       frameRate: 3,
//       frameBuffer: 12,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/runRight.png",
//     },
//     runLeft: {
//       frameRate: 3,
//       frameBuffer: 12,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/runLeft.png",
//     },
//     jumpRight: {
//       frameRate: 3,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/jumpRight.png",
//     },
//     jumpLeft: {
//       frameRate: 3,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/jumpLeft.png",
//     },
//     fallRight: {
//       frameRate: 3,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/fallRight.png",
//     },
//     fallLeft: {
//       frameRate: 3,
//       frameBuffer: 10,
//       loop: true,
//       imageSrc: "./textures/characters/character1/normal/fallLeft.png",
//     },
//   },
// });

const players = {};

socket.on("updatePlayers", backendPlayers => {
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!players[id]) {
      players[id] = new Player({
        position: {
          x: backendPlayer.x,
          y: backendPlayer.y,
        },
        imageSrc: "./textures/characters/character1/normal/idleRight.png",
        frameRate: 4,
        animations: {
          idleRight: {
            frameRate: 4,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/idleRight.png",
          },
          idleLeft: {
            frameRate: 4,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/idleLeft.png",
          },
          runRight: {
            frameRate: 3,
            frameBuffer: 12,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/runRight.png",
          },
          runLeft: {
            frameRate: 3,
            frameBuffer: 12,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/runLeft.png",
          },
          jumpRight: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/jumpRight.png",
          },
          jumpLeft: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/jumpLeft.png",
          },
          fallRight: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/fallRight.png",
          },
          fallLeft: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: "./textures/characters/character1/normal/fallLeft.png",
          },
        },
      });
    } else {
      players[id].x = backendPlayer.x;
      players[id].y = backendPlayer.y;
    }

  }
  for (const id in players) {
    if (!backendPlayers[id]) {
      delete players[id];
    }
  }
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (const id in players) {
    const currentPlayer = players[id];
    currentPlayer.update(); // Füge diesen Aufruf hinzu
    currentPlayer.draw();
  }

  wintercabin1.draw();

  if (players[socket.id]) {
    players[socket.id].velocity.x = 0; // Zugriff auf velocity über players[socket.id]
    if (keys.d.pressed && keys.a.pressed) {
      if (players[socket.id].lastDirection === "left")
        players[socket.id].switchSprite("idleLeft");
      else if (players[socket.id].lastDirection === "right")
        players[socket.id].switchSprite("idleRight");
      players[socket.id].velocity.x = 0;
    } else if (keys.a.pressed) {
      players[socket.id].switchSprite("runLeft");
      players[socket.id].velocity.x = -3.5;
      players[socket.id].lastDirection = "left";
    } else if (keys.d.pressed) {
      players[socket.id].switchSprite("runRight");
      players[socket.id].velocity.x = 3.5;
      players[socket.id].lastDirection = "right";
    } else {
      if (players[socket.id].lastDirection === "left")
        players[socket.id].switchSprite("idleLeft");
      else players[socket.id].switchSprite("idleRight");
    }

    if (players[socket.id].velocity.y < 0) {
      if (players[socket.id].lastDirection === "left")
        players[socket.id].switchSprite("jumpLeft");
      else if (players[socket.id].lastDirection === "right")
        players[socket.id].switchSprite("jumpRight");
    } else if (players[socket.id].velocity.y > 0) {
      if (players[socket.id].lastDirection === "left")
        players[socket.id].switchSprite("fallLeft");
      else if (players[socket.id].lastDirection === "right")
        players[socket.id].switchSprite("fallRight");
    }
  }
}

animate();

window.addEventListener("keydown", event => {
  switch (event.key) {
    case " ":
      if (players[socket.id].velocity.y === 0)
        players[socket.id].velocity.y = -16;
      socket.emit("keydown", " ");
      socket.emit("updatePosition", {
        x: players[socket.id].x,
        y: players[socket.id].y,
      }); // Position an den Server senden
      break;
    case "a":
      keys.a.pressed = true;
      socket.emit("keydown", "a");
      socket.emit("updatePosition", {
        x: players[socket.id].x,
        y: players[socket.id].y,
      }); // Position an den Server senden
      break;
    case "d":
      keys.d.pressed = true;
      socket.emit("keydown", "d");
      socket.emit("updatePosition", {
        x: players[socket.id].x,
        y: players[socket.id].y,
      }); // Position an den Server senden
      break;
  }
});

window.addEventListener("keyup", event => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
