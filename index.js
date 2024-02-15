const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const jump_height = 20;
const speed = 5;

class Sprite{
    constructor({position, velocity, width, height}){
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.last_key;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
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
    }

});