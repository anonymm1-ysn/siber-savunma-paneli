const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let gameState = 'intro'; 
let motherPos = -150;
const player = { x: 380, y: 380, w: 32, h: 42, speed: 4.5 };
const monster = { x: 50, y: 50, w: 50, h: 70, speed: 2.6, active: false };

const mazeWalls = [
    {x: 150, y: 0, w: 30, h: 400},
    {x: 350, y: 200, w: 30, h: 400},
    {x: 550, y: 0, w: 30, h: 450},
    {x: 150, y: 400, w: 300, h: 30},
    {x: 550, y: 150, w: 250, h: 30}
];

const keys = {};
// WASD İÇİN DINLEYICI
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e') {
        if (gameState === 'dialogue') {
            gameState = 'sleeping';
            setTimeout(() => { gameState = 'nightmare_intro'; }, 2000);
        } else if (gameState === 'nightmare_intro') {
            gameState = 'nightmare_run';
            monster.active = true;
        } else if (gameState === 'game_over') {
            location.reload();
        }
    }
});

function drawPlayer(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 5, y + 15, 22, 27); // Gövde
    ctx.fillStyle = "#FFE0BD"; 
    ctx.fillRect(x + 8, y, 16, 16); // Kafa
    ctx.fillStyle = "black";
    ctx.fillRect(x + 10, y + 5, 3, 3); // Göz 1
    ctx.fillRect(x + 18, y + 5, 3, 3); // Göz 2
}

function drawMonster(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y + 20, 50, 50); // Gövde
    ctx.fillRect(x + 15, y, 20, 25); // Kafa
    ctx.fillRect(x - 5, y + 25, 10, 35); // Kol
    ctx.fillRect(x + 45, y + 25, 10, 35); // Kol
    ctx.fillStyle = "red";
    ctx.fillRect(x + 18, y + 10, 4, 4);
    ctx.fillRect(x + 28, y + 10, 4, 4);
}

function update() {
    if (gameState === 'mother_entry') {
        if (motherPos < 100) motherPos += 2; else gameState = 'dialogue';
    }
    
    if (gameState === 'nightmare_run') {
        let nextX = player.x;
        let nextY = player.y;

        // WASD KONTROLLERİ
        if (keys['w']) nextY -= player.speed;
        if (keys['s']) nextY += player.speed;
        if (keys['a']) nextX -= player.speed;
        if (keys['d']) nextX += player.speed;

        let canMoveX = true;
        let canMoveY = true;
        for (let wall of mazeWalls) {
            if (nextX < wall.x + wall.w && nextX + player.w > wall.x && player.y < wall.y + wall.h && player.y + player.h > wall.y) canMoveX = false;
            if (player.x < wall.x + wall.w && player.x + player.w > wall.x && nextY < wall.y + wall.h && nextY + player.h > wall.y) canMoveY = false;
        }

        if (canMoveX) player.x = nextX;
        if (canMoveY) player.y = nextY;

        monster.x += (player.x - monster.x) * 0.02;
        monster.y += (player.y - monster.y) * 0.02;

        if (Math.hypot(monster.x - player.x, monster.y - player.y) < 35) gameState = 'game_over';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'intro' || gameState === 'mother_entry' || gameState === 'dialogue') {
        ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#1a0a00"; ctx.fillRect(350, 420, 120, 60); 
        drawPlayer(player.x, player.y, "#D4AF37");
        if (gameState !== 'intro') {
            ctx.fillStyle = "#222"; ctx.fillRect(motherPos, 330, 40, 110);
        }
    }

    if (gameState === 'dialogue') drawBox("ANNE: Hadi yat artık, yarın okulun var.");

    if (gameState === 'nightmare_intro' || gameState === 'nightmare_run') {
        ctx.fillStyle = "#00001a"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#111144";
        mazeWalls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));
        
        drawPlayer(player.x, player.y, "#D4AF37");
        if (monster.active) drawMonster(monster.x, monster.y);
        
        if (gameState === 'nightmare_intro') drawBox("...yatağın altından tıkırtılar geliyor...");
    }

    if (gameState === 'game_over') {
        ctx.fillStyle = "black"; ctx.fillRect(0,0,800,600);
        ctx.fillStyle = "red"; ctx.font = "40px Courier New";
        ctx.fillText("SENİ YAKALADIM", 220, 300);
        ctx.font = "15px Courier New";
        ctx.fillText("[E] - TEKRAR DENE", 320, 350);
    }
}

function drawBox(text) {
    ctx.fillStyle = "black"; ctx.strokeStyle = "white"; ctx.lineWidth = 2;
    ctx.fillRect(100, 480, 600, 80); ctx.strokeRect(100, 480, 600, 80);
    ctx.fillStyle = "white"; ctx.font = "16px Courier New";
    ctx.fillText(text, 130, 525);
}

function gameLoop() { update(); draw(); requestAnimationFrame(gameLoop); }

playBtn.addEventListener('click', () => {
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
    setTimeout(() => { if(gameState==='intro') gameState='mother_entry'; }, 1000);
});