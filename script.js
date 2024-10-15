const player = document.getElementById('player');
const point = document.getElementById('point');
const obstacle = document.getElementById('obstacle');
const scoreboard = document.getElementById('score');

let score = 0;
let playerPosition = 125;
let gameInterval;
let gameSpeed= 5;

function startGame() {
  resetObject(point, 'point');
  resetObject(obstacle, 'obstacle');

  gameInterval= setInterval(() => {
    moveObject(point, 'point');
    moveObject(obstacle, 'obstacle');
    checkCollision();
  }, 20);
}

function resetObject(object, type){
    object.style.top = '-50px';
    object.style.left = `${Math.floor(Math.random() * 270)}px`;
}

function moveObject(object, type){
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));
    
    if(objectTop >= 600)
    {
        resetObject(object, type);
    }
    else
    {
        object.style.top=`${objectTop + gameSpeed}px`;
    }
}

function checkCollision(){
    let playerRect = player.getBoundingClientRect();
    let pointRect = point.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if( playerRect.left < pointRect.right &&
        playerRect.right > pointRect.left &&
        playerRect.top < pointRect.bottom &&
        playerRect.bottom > pointRect.top )
        {
            score +=1;
            scoreboard.textContent = score;
            resetObject(point, 'point');
        }
    
    if( playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top )
        {
            clearInterval(gameInterval);
            if(score > 10 && score < 25){
            alert('Game Over ! Your Score : ' + score +' '+ 'HA! HA! HA! NOT BAD KIDOO 👌');
            }
            else if(score > 25 && score <35){
            alert('Game Over ! Your Score : ' + score +' '+ 'WOW ! Nice 1 BUDDY 😊!!! ');
            }
            else if(score > 35){
            alert('Game Over! Your Score : ' + score +' '+ 'WOW! You really cross 35 ! , MASTER 🤩!!! ');
            }
            else{
            alert('Game Over !  Your Score : ' + score + ' '+' Less than 10 WHAT A FAILIURE 🤣!!!');
            }
            window.location.reload();
        }
}

document.addEventListener('keydown', (event) => 
{
    if(event.key === 'ArrowLeft' && playerPosition > 0){
        playerPosition -= 20;
    }
    else if(event.key === 'ArrowRight' && playerPosition < 250){
        playerPosition += 20;
    }
    player.style.left = `${playerPosition}px`;
});

startGame();

