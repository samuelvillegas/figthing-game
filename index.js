const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const jump_height = 20;
const speed = 5;

class Sprite{
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

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
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

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0,
    },
    width: 50,
    height: 150,
    color: 'red',
    offset: {
        x: 0,
        y: 0
    },
    damage: 10
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 150
    },
    velocity: {
        x: 0,
        y: 0
    },
    width: 50,
    height: 150,
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    },
    damage: 10
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    }
};

function rectangularCollision(rectangle1, rectangle2){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        ) 
}

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    // Player movement
    player.velocity.x = 0;

    if (keys.a.pressed && player.last_key === 'a'){
        player.velocity.x = -speed;
    } else if (keys.d.pressed && player.last_key === 'd'){
        player.velocity.x = speed;
    }

    // Enemy movement
    enemy.velocity.x = 0;

    if (keys.ArrowLeft.pressed && enemy.last_key === 'ArrowLeft'){
        enemy.velocity.x = -speed;
    }
    else if (keys.ArrowRight.pressed && enemy.last_key === 'ArrowRight'){
        enemy.velocity.x = speed;
    }

    // Collision detection
    // Player attack box
    if (
        rectangularCollision(player, enemy) && player.isAttacking
    ){
        player.isAttacking = false;
        enemy.health -= player.attackBox.damage;
        document.querySelector('#enemy-health').style.width = enemy.health + "%"
    }

    // Enemy attack box
    if (
        rectangularCollision(enemy, player) && enemy.isAttacking
    ){
        enemy.isAttacking = false;
        player.health -= enemy.attackBox.damage;

        document.querySelector('#player-health').style.width = player.health + "%"
    }

}

animate();

window.addEventListener('keydown', (e) => {
    // Player movement
    switch(e.key){
        case 'd':
           keys.d.pressed = true;
           player.last_key = 'd'
        break;
        case 'a':
            keys.a.pressed = true;
            player.last_key = 'a'
        break;
        case 'w':
            if(!keys.w.pressed){
                player.velocity.y = -jump_height;
                keys.w.pressed = true;
            }
        break;
        case ' ':
            player.attack();
        break;
    }

    // Enemy movement
    switch(e.key){
        case 'ArrowRight':
           keys.ArrowRight.pressed = true;
           enemy.last_key = 'ArrowRight'
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.last_key = 'ArrowLeft'
        break;
        case 'ArrowUp':
            if (!keys.ArrowUp.pressed){
                enemy.velocity.y = -jump_height;
                keys.ArrowUp.pressed = true;
            }
        break;
    }
});

window.addEventListener('keyup', (e) => {
    // Player movement
    switch(e.key){
        case 'd':
              keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'w':
            keys.w.pressed = false;
        break;
    }

    // Enemy movement
    switch(e.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
        break;
        case 'ArrowDown':
            enemy.attack();
        break;
    }

});