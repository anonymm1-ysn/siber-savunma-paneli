const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let gameState = 'intro'; 
let dialogueIndex = 0;
let motherPos = -100; 

// Karakterleri yere sabitlemek için Y koordinatlarını artırdık (Zemine indirdik)
const player = { x: 380, y: 380, w: 64, h: 64 }; // Yatakta oturan çocuk
const mother = { x: 50, y: 330, w: 68, h: 110 }; // Zeminde yürüyen anne

const scenes = [
    { speaker: "ANNE", text: "Hadi artık yat oğlum, yarın okulun var." },
    { speaker: "İÇ SES", text: "Bu yatak da hiç rahat hissettirmiyor..." }
];

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e') {
        if (gameState === 'dialogue') {
            gameState = 'sleeping';
            setTimeout(() => { gameState = 'nightmare'; }, 3000);
        }
    }
});

function drawRoom3D() {
    // Arka Duvar
    ctx.fillStyle = "#080808";
    ctx.fillRect(100, 100, 600, 350);

    // Yan Duvarlar
    ctx.fillStyle = "#040404";
    ctx.beginPath(); // Sol
    ctx.moveTo(0, 0); ctx.lineTo(100, 100); ctx.lineTo(100, 450); ctx.lineTo(0, 600);
    ctx.fill();
    ctx.beginPath(); // Sağ
    ctx.moveTo(800, 0); ctx.lineTo(700, 100); ctx.lineTo(700, 450); ctx.lineTo(800, 600);
    ctx.fill();

    // ZEMİN (Karakterlerin bastığı yer)
    ctx.fillStyle = "#0c0c0c";
    ctx.beginPath();
    ctx.moveTo(0, 600); ctx.lineTo(100, 450); ctx.lineTo(700, 450); ctx.lineTo(800, 600);
    ctx.fill();

    // DUVARDAN SÜZÜLEN IŞIK (Pencere değil, duvardaki bir yarıktan sızan ışık)
    ctx.fillStyle = "rgba(200, 200, 255, 0.05)";
    ctx.beginPath();
    ctx.moveTo(700, 120); 
    ctx.lineTo(300, 580); 
    ctx.lineTo(600, 580); 
    ctx.lineTo(700, 300);
    ctx.fill();
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
    let line = '';
    let y = 470;
    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 600) {
            ctx.fillText(line, 80, y);
            line = words[n] + ' ';
            y += 30;
        } else { line = testLine; }
    }
    ctx.fillText(line, 80, y);
}

function drawNightmareWorld() {
    // KOYU MAVİ BOŞLUK
    ctx.fillStyle = "#000022";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // TIRTIKLI ZEMİN (Zigzaglar)
    ctx.strokeStyle = "#111144";
    ctx.lineWidth = 3;
    for(let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 450);
        ctx.lineTo(i + 20, 470);
        ctx.lineTo(i + 40, 450);
        ctx.stroke();
    }
    
    drawUndertaleBox(scenes[1].text);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== 'nightmare') {
        drawRoom3D();

        // YATAK (Zemine yakın)
        ctx.fillStyle = "#221100";
        ctx.fillRect(350, 380, 120, 80); 
        ctx.fillStyle = "#333";
        ctx.fillRect(355, 385, 110, 40);

        // ÇOCUK (Yatakta oturuyor)
        ctx.fillStyle = "#D4AF37"; ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = "#FFE0BD"; ctx.fillRect(player.x + 15, player.y - 10, 34, 30);

        if (gameState === 'mother_entry' || gameState === 'dialogue') {
            // ANNE (Zeminde yürüyor)
            ctx.fillStyle = "#222"; ctx.fillRect(motherPos, mother.y, mother.w, mother.h);
            ctx.fillStyle = "#FFE0BD"; ctx.fillRect(motherPos + 10, mother.y - 20, 48, 40);
        }
    }

    if (gameState === 'dialogue') {
        drawUndertaleBox(scenes[0].text);
    }

    if (gameState === 'sleeping') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px 'Courier New'";
        ctx.fillText("...Zzz...", 350, 300);
    }

    if (gameState === 'nightmare') {
        drawNightmareWorld();
    }
}

function update() {
    if (gameState === 'mother_entry') {
        if (motherPos < 120) motherPos += 3;
        else gameState = 'dialogue';
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

playBtn.addEventListener('click', () => {
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
    setTimeout(() => { gameState = 'mother_entry'; }, 1500);
});