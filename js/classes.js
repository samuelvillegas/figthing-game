var timer = 60
let timerId

const gravity = 0.7;
const jump_height = 20;
const speed = 5;

class Sprite{
    constructor({position, imageSrc, width, height}){
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
     }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
    }
}

class Fighter{
    constructor({position, velocity, width, height, color='red', offset, damage=10}){
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.color = color;
        this.last_key;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
            damage: damage
        }
        this.isAttacking = false;
        this.health = 100;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Attack box
        if (this.isAttacking){
            c.fillStyle = 'green';
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            );
        }
    }

    update(){
        this.draw();
        
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= (canvas.height - 61)){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
