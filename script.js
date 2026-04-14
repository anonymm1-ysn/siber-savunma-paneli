const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let gameState = 'intro'; 
let motherPos = -150;
const player = { x: 380, y: 380, w: 40, h: 40, speed: 4 };
const monster = { x: 50, y: 50, w: 60, h: 90, speed: 2.2, active: false };

// LABİRENT DUVARLARI (Kabus Evreni)
const mazeWalls = [
    {x: 200, y: 100, w: 20, h: 300},
    {x: 400, y: 0, w: 20, h: 250},
    {x: 400, y: 350, w: 20, h: 250},
    {x: 600, y: 150, w: 20, h: 300},
    {x: 200, y: 400, w: 400, h: 20}
];

const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// --- KORKUNÇ SES SİSTEMİ ---
function playHorrorAmbiance() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'brownian'; 
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(30, audioCtx.currentTime); // Çok düşük frekans
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start();
}

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e') {
        if (gameState === 'dialogue') {
            gameState = 'sleeping';
            setTimeout(() => { gameState = 'nightmare_intro'; }, 2000);
        } else if (gameState === 'nightmare_intro') {
            gameState = 'nightmare_run';
            monster.active = true;
        } else if (gameState === 'game_over') {
            location.reload(); // Öldüğünde sayfayı yeniler
        }
    }
});

function checkMazeCollision(nextX, nextY) {
    for (let wall of mazeWalls) {
        if (nextX < wall.x + wall.w && nextX + player.w > wall.x &&
            nextY < wall.y + wall.h && nextY + player.h > wall.y) return true;
    }
    return false;
}

function update() {
    if (gameState === 'mother_entry') {
        if (motherPos < 120) motherPos += 2; else gameState = 'dialogue';
    }
    
    if (gameState === 'nightmare_run') {
        let nextX = player.x;
        let nextY = player.y;

        if (keys['w']) nextY -= player.speed;
        if (keys['s']) nextY += player.speed;
        if (keys['a']) nextX -= player.speed;
        if (keys['d']) nextX += player.speed;

        if (!checkMazeCollision(nextX, player.y)) player.x = nextX;
        if (!checkMazeCollision(player.x, nextY)) player.y = nextY;

        // CANAVAR TAKİBİ
        monster.x += (player.x - monster.x) * 0.015;
        monster.y += (player.y - monster.y) * 0.015;

        // ÖLÜM KONTROLÜ
        let dist = Math.hypot(monster.x - player.x, monster.y - player.y);
        if (dist < 40) gameState = 'game_over';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'intro' || gameState === 'mother_entry' || gameState === 'dialogue') {
        // ODA ÇİZİMİ
        ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#111"; ctx.fillRect(350, 380, 120, 80); // Yatak
        ctx.fillStyle = "#D4AF37"; ctx.fillRect(player.x, player.y, 40, 40); // Çocuk
        if (gameState !== 'intro') {
            ctx.fillStyle = "#222"; ctx.fillRect(motherPos, 330, 50, 100); // Anne
        }
    }

    if (gameState === 'dialogue') drawBox("ANNE: Hadi yat artık, yarın okulun var.");

    if (gameState === 'nightmare_intro' || gameState === 'nightmare_run') {
        // KABUS DÜNYASI (Daha Karanlık)
        ctx.fillStyle = "#000011"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Labirent Duvarları
        ctx.fillStyle = "#000044";
        mazeWalls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

        // Çocuk
        ctx.fillStyle = "#D4AF37"; ctx.fillRect(player.x, player.y, 32, 32);

        // CANAVAR (Daha Ürkütücü)
        ctx.fillStyle = "black";
        ctx.fillRect(monster.x, monster.y, monster.w, monster.h);
        // Titreyen Kırmızı Gözler
        ctx.fillStyle = "red";
        ctx.fillRect(monster.x + 15 + Math.random()*2, monster.y + 20, 8, 8);
        ctx.fillRect(monster.x + 35 + Math.random()*2, monster.y + 20, 8, 8);
        
        if (gameState === 'nightmare_intro') drawBox("...bu yatak rahat değil... bir şeyler yaklaşıyor...");
    }

    if (gameState === 'game_over') {
        ctx.fillStyle = "black"; ctx.fillRect(0,0,800,600);
        ctx.fillStyle = "red"; ctx.font = "50px Courier New";
        ctx.fillText("YATAĞIN ALTINDAYIM", 150, 300);
        ctx.font = "20px Courier New";
        ctx.fillText("TEKRAR DENEMEK İÇİN 'E' BAS", 250, 360);
    }
}

function drawBox(text) {
    ctx.fillStyle = "black"; ctx.strokeStyle = "white"; ctx.lineWidth = 3;
    ctx.fillRect(50, 450, 700, 100); ctx.strokeRect(50, 450, 700, 100);
    ctx.fillStyle = "white"; ctx.font = "18px Courier New";
    ctx.fillText(text, 80, 500);
    ctx.font = "12px Courier New"; ctx.fillText("[E]", 680, 530);
}

function gameLoop() { update(); draw(); requestAnimationFrame(gameLoop); }

playBtn.addEventListener('click', () => {
    playHorrorAmbiance();
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
    setTimeout(() => { if(gameState==='intro') gameState='mother_entry'; }, 1000);
});