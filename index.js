const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png',
    width: canvas.width,
    height: canvas.height,
});

const player = new Fighter({
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


const enemy = new Fighter({
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

decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
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
    
    // End game based on health
    if (player.health <= 0 || enemy.health <= 0){
        determineWinner(player, enemy, timerId);
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