class Sprite {
    constructor({ position, imageSrc = "Idle.png", scale = 1, framesMax = 1, frameCurrent }) {
        this.position = position
        this.width = 50
        this.height = 100
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 10

    }



    draw() {
     
        
        c.drawImage(
            this.image,

            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale

        )
        
        
        
    }
    update() {

        this.draw()
        this.frameElapsed++
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {

                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    }
}

class Fighter extends Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax
        })

        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 10
        this.lastKey
        this.width = 50
        this.height = 100

        this.health = 100;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: 100,
                y: 0
            },
            width: 100,
            height: 50,

        }
        this.isAttacking

    }
    
    update() {

        this.draw()
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {

                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    
        this.position.x += this.position.vx
        this.position.y += this.position.vy
        if (player.position.x < enemy.position.x) {
          
            enemy.attackBox.position.x = enemy.position.x - 50
            enemy.attackBox.position.y = enemy.position.y
            player.attackBox.position.x = player.position.x
            player.attackBox.position.y = player.position.y
            enemy.image
        } else {


            player.attackBox.position.x = player.position.x - 50
            player.attackBox.position.y = player.position.y
            enemy.attackBox.position.x = enemy.position.x
            enemy.attackBox.position.y = enemy.position.y
        }
        if (this.position.y + this.position.h + this.position.vy >= canvas.height - 190) {
            this.position.vy = 0

        }
        else {
            this.position.vy += gravity
        }
        

    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}