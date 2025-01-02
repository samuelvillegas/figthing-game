function rectangularCollision(rectangle1, rectangle2){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    ) 
}
function decreaseTimer(){
    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if(timer === 0){
        determineWinner(player, enemy, timerId);
    }
}

function determineWinner(player, enemy, timerId){
    clearTimeout(timerId);
    if(player.health == enemy.health){
        document.querySelector('#display_match').innerHTML = "It's a draw";
        
    } else if (player.health > enemy.health){
        document.querySelector('#display_match').innerHTML = "Player 1 wins";
    }
    else {
        document.querySelector('#display_match').innerHTML = "Player 2 wins";
    }
    document.querySelector('#display_match').style.display = 'flex';
}