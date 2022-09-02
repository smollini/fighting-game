const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;
const background = new Sprite({
    position:
    {
        x:0,
        y:0
    },
    imageSrc:'background.png'
})
const shop = new Sprite({
    position:
    {
        x:630,
        y:165
    },
    imageSrc:'shop.png',
    scale:  2.5,
    framesMax:6
})

const player = new Fighter({
    position:{ x: 0, y: 0, vy: 10, vx: 0, h: 150, w: 50 },
   
    imageSrc:'Idle.png',
    scale: 2,
    framesMax:8
});

                        
const enemy = new Fighter({
    
        position: {x: 400, y: 100, vy: 10, vx: 0, h: 150, w: 50}, 
        imageSrc: './kenji/Idle.png',
        scale: 2,
        framesMax: 4
});
const keys =
{
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    w: {
        pressed: false
    }
}
let lastKey
function determinateWinner({player,enemy,timerId})
{
    clearTimeout(timerId)
    

    
    if(player.health === enemy.health)
    {
        console.log('remis')
        document.querySelector('#displayText').innerHTML = 'remis'
        document.querySelector('#displayText').style.display='flex'
    }
    if(player.health>enemy.health )
    {
        console.log('player1 wins')
        document.querySelector('#displayText').innerHTML = 'player1Win'
        document.querySelector('#displayText').style.display='flex'
    }
    if(player.health <enemy.health )
    {
        console.log('player 2 wins')
        document.querySelector('#displayText').innerHTML = 'player2Win'
        document.querySelector('#displayText').style.display='flex'
    }
}
let timer =10;
let timerId;
function decressTimer()
{
    timerId = setTimeout(decressTimer,1000)
if(timer>0)
{
    timer--;
    document.querySelector('#timer').innerHTML = timer;
}
if(timer===0)
{
    document.querySelector('#displayText').style.display='flex'
    determinateWinner({player,enemy,timerId});
}

}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    
    background.update()
    shop.update()    

    player.update()
    enemy.update()
    
    
    // enemy movement
    enemy.position.vx = 0

    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        enemy.position.vx = -5
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        enemy.position.vx = 5
    } else if (keys.ArrowUp.pressed && enemy.position.y + enemy.position.h >= canvas.height-190) {
        enemy.position.vy = -20
    }
    //player movment
    player.position.vx = 0

    if (keys.a.pressed && player.lastKey === 'a') {
    
        player.position.vx = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.position.vx = 5
    } else if (keys.w.pressed && player.position.y + player.position.h >= canvas.height-190) {
        player.position.vy = -20
    }
    if(player.attackBox.position.x+player.attackBox.width>=enemy.position.x &&
        player.attackBox.position.x+player.attackBox.width<=enemy.position.x+enemy.position.w&&
        player.attackBox.position.y+player.attackBox.height>=enemy.position.y &&
        player.attackBox.position.y+player.attackBox.height<=enemy.position.y+enemy.position.h&&
        player.isAttacking == true||player.attackBox.position.x>=enemy.position.x&&
        player.attackBox.position.x<=enemy.position.x+enemy.position.w &&
        player.attackBox.position.y+player.attackBox.height>=enemy.position.y &&
        player.attackBox.position.y+player.attackBox.height<=enemy.position.y+enemy.position.h&&
        player.isAttacking == true)
    {   
        enemy.health -=5
        document.querySelector('#enemyHealt').style.width =enemy.health +'%'
    }
    player.isAttacking=false;
    if(enemy.attackBox.position.x+enemy.attackBox.width>=player.position.x &&
        enemy.attackBox.position.x+enemy.attackBox.width<=player.position.x+player.position.w &&
        enemy.attackBox.position.y+enemy.attackBox.height>=player.position.y &&
        enemy.attackBox.position.y+enemy.attackBox.height<=player.position.y+player.position.h&&
        enemy.isAttacking == true || enemy.attackBox.position.x>=player.position.x&&
        enemy.attackBox.position.x<=player.position.x+player.position.w &&
        enemy.attackBox.position.y+enemy.attackBox.height>=player.position.y &&
        enemy.attackBox.position.y+enemy.attackBox.height<=player.position.y+player.position.h&&
        enemy.isAttacking == true)
    {
        player.health -=5
        document.querySelector('#playerHealt').style.width =player.health +'%'
    }
    enemy.isAttacking = false;
    if(player.health<=0||enemy.health<=0)
    {
        determinateWinner({player,enemy,timerId});
    }
   
}
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            //player.position.vy = -10
            break
        case' ':
            player.attack();
           
            break
    }
    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break
        case'0':
            enemy.attack();
            
            break



    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false

            break
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false


            break
    }
})
decressTimer();

