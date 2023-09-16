// window.addEventListener("keydown", event => {
//   switch (event.key) {
//     case " ":
//       if (player.velocity.y === 0) player.velocity.y = -16;
//       break;
//     case "a":
//       keys.a.pressed = true;
//       break;
//     case "d":
//       keys.d.pressed = true;
//       break;
//   }
// });

// window.addEventListener("keyup", event => {
//   switch (event.key) {
//     case "a":
//       keys.a.pressed = false;
//       break;
//     case "d":
//       keys.d.pressed = false;
//       break;
//   }
// });

// window.addEventListener("click", event => {
//   const mouseX = event.clientX;
//   const mouseY = event.clientY;

//   if (
//     mouseX >= player.hitbox.position.x &&
//     mouseX <= player.hitbox.position.x + player.hitbox.width &&
//     mouseY >= player.hitbox.position.y &&
//     mouseY <= player.hitbox.position.y + player.hitbox.height
//   ) {
//     console.log("du hast auf den player gedrückt");
//   }
// });
