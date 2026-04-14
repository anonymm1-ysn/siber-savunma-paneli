const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// ==========================================
// 🖼️ PNG YÜKLEME İSTASYONU
// ==========================================
const PLAYER_IMAGE_URL = "c:\Users\Administrator\Downloads\New Piskel.png"; 
const MOTHER_IMAGE_URL = "c:\Users\Administrator\Downloads\New Piskel (1).png";

// Resim Kontrolcüleri
const playerImg = new Image();
playerImg.src = PLAYER_IMAGE_URL;
let playerLoaded = false;
playerImg.onload = () => playerLoaded = true;

const motherImg = new Image();
motherImg.src = MOTHER_IMAGE_URL;
let motherLoaded = false;
motherImg.onload = () => motherLoaded = true;

// Oyun Değişkenleri
let gameState = 'intro'; 
let motherPos = -150;
const player = { x: 380, y: 380, w: 64, h: 64, speed: 5 };
const mother = { x: 50, y: 330, w: 75, h: 120 }; // Anneyi biraz daha büyük yaptık
const monster = { x: 100, y: 100, w: 80, h: 120, active: false };
let crumbs = [];

const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Etkileşim
window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e') {
        if (gameState === 'dialogue') {
            gameState = 'sleeping';
            setTimeout(() => { gameState = 'nightmare_intro'; }, 3000);
        } else if (gameState === 'nightmare_intro') {
            gameState = 'nightmare_walk';
            spawnCrumbs();
        }
    }
});

function spawnCrumbs() {
    for(let i=0; i<8; i++) {
        crumbs.push({ x: Math.random() * 700 + 50, y: Math.random() * 400 + 100 });
    }
}

// Resim Çizdirme Yardımcısı
function drawSprite(img, loaded, x, y, w, h, fallbackColor) {
    if (loaded) {
        ctx.drawImage(img, x, y, w, h);
    } else {
        ctx.fillStyle = fallbackColor;
        ctx.fillRect(x, y, w, h);
    }
}

function drawUndertaleBox(text) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.fillRect(50, 420, 700, 140);
    ctx.strokeRect(50, 420, 700, 140);
    ctx.fillStyle = "white";
    ctx.font = "20px 'Courier New'";
    
    const words = text.split(' ');
    let line = ''; let lineY = 470;
    for(let n = 0; n < words.length; n++) {
        if (ctx.measureText(line + words[n]).width > 600) {
            ctx.fillText(line, 80, lineY);
            line = words[n] + ' '; lineY += 30;
        } else { line += words[n] + ' '; }
    }
    ctx.fillText(line, 80, lineY);
    ctx.font = "12px 'Courier New'";
    ctx.fillText("[E - DEVAM ET]", 600, 540);
}

function update() {
    if (gameState === 'mother_entry') {
        if (motherPos < 120) motherPos += 3;
        else gameState = 'dialogue';
    }
    
    if (gameState === 'nightmare_walk') {
        if (keys['w']) player.y -= player.speed;
        if (keys['s']) player.y += player.speed;
        if (keys['a']) player.x -= player.speed;
        if (keys['d']) player.x += player.speed;

        crumbs = crumbs.filter(c => {
            let dist = Math.hypot(c.x - player.x, c.y - player.y);
            if(dist < 50) { monster.active = true; return false; }
            return true;
        });

        if (monster.active) {
            monster.x += (player.x - monster.x) * 0.01;
            monster.y += (player.y - monster.y) * 0.01;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'intro' || gameState === 'mother_entry' || gameState === 'dialogue') {
        // ODA
        ctx.fillStyle = "#080808"; ctx.fillRect(100, 100, 600, 350);
        ctx.fillStyle = "#0c0c0c"; ctx.beginPath(); ctx.moveTo(0, 600); ctx.lineTo(100, 450); ctx.lineTo(700, 450); ctx.lineTo(800, 600); ctx.fill();
        
        // YATAK VE ÇOCUK
        ctx.fillStyle = "#221100"; ctx.fillRect(350, 380, 120, 80); 
        drawSprite(playerImg, playerLoaded, player.x, player.y, player.w, player.h, "#D4AF37");

        if (gameState !== 'intro') {
            // ANNE
            drawSprite(motherImg, motherLoaded, motherPos, mother.y, mother.w, mother.h, "#222");
        }
    }

    if (gameState === 'dialogue') drawUndertaleBox("Hadi artık yat oğlum, yarın okulun var.");

    if (gameState === 'nightmare_intro' || gameState === 'nightmare_walk') {
        ctx.fillStyle = "#000022"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Tırtıklı zemin
        ctx.strokeStyle = "#111144"; ctx.lineWidth = 3;
        for(let i=0; i<800; i+=40) { ctx.beginPath(); ctx.moveTo(i, 450); ctx.lineTo(i+20, 470); ctx.lineTo(i+40, 450); ctx.stroke(); }
        
        // Kırıntılar
        ctx.fillStyle = "#d2b48c";
        crumbs.forEach(c => ctx.fillRect(c.x, c.y, 8, 8));

        drawSprite(playerImg, playerLoaded, player.x, player.y, player.w, player.h, "#D4AF37");

        if (monster.active) {
            ctx.fillStyle = "black"; ctx.fillRect(monster.x, monster.y, monster.w, monster.h);
            ctx.fillStyle = "red"; ctx.fillRect(monster.x+20, monster.y+20, 10, 10); ctx.fillRect(monster.x+50, monster.y+20, 10, 10);
        }
        
        if (gameState === 'nightmare_intro') drawUndertaleBox("Bu yatak hiç rahat değil... Sanki her yer kırıntı.");
    }

    if (gameState === 'sleeping') {
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white"; ctx.font = "30px Courier"; ctx.fillText("...Zzz...", 350, 300);
    }
}

function gameLoop() { update(); draw(); requestAnimationFrame(gameLoop); }

playBtn.addEventListener('click', () => {
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
    setTimeout(() => { if(gameState==='intro') gameState='mother_entry'; }, 1500);
});