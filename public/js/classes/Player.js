class Player extends Sprite {
  constructor({ imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });
    this.position = {
      x: 500 * Math.random(),
      y: this.playerHeight - this.height,
    };
    this.canvasHeight = innerHeight;
    this.playerHeight = 65

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    if (this.sides.bottom < canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.height;
      this.sides.bottom = this.position.y + this.height;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
      this.sides.bottom = this.position.y + this.height;
    }
    this.hitbox = {
      position: {
        x: this.position.x + 32,
        y: this.position.y + 55,
      },
      width: 60,
      height: 65,
    };
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
  }
}
