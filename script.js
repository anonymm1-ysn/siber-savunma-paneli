const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let gameState = 'intro'; // intro, mother_entry, dialogue, sleeping, nightmare
let dialogueIndex = 0;
let motherPos = -100; // Kapı dışından başlayacak

const player = { x: 380, y: 300, w: 64, h: 64 };
const mother = { x: 50, y: 250, w: 68, h: 110 }; // Daha uzun anne

const scenes = [
    { speaker: "ANNE", text: "Hadi yat artık oğlum, saat çok geç oldu. Işıkları kapatıyorum." },
    { speaker: "İÇ SES", text: "Bu yatak neden bu kadar rahatsız? Sanki altında bir şeyler kıpırdıyor..." }
];

// KLAVYE ETKİLEŞİMİ
window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e') {
        if (gameState === 'dialogue') {
            gameState = 'sleeping';
            setTimeout(startNightmare, 3000);
        }
    }
});

function startNightmare() {
    gameState = 'nightmare';
}

function drawRoom3D() {
    // Tavan ve Yer Derinliği
    ctx.fillStyle = "#0a0a0a"; // Arka duvar
    ctx.fillRect(100, 100, 600, 300);

    // Yan Duvarlar (Perspektif)
    ctx.fillStyle = "#050505";
    ctx.beginPath(); // Sol duvar
    ctx.moveTo(0, 0); ctx.lineTo(100, 100); ctx.lineTo(100, 400); ctx.lineTo(0, 600);
    ctx.fill();

    ctx.beginPath(); // Sağ duvar (Pencere burada)
    ctx.moveTo(800, 0); ctx.lineTo(700, 100); ctx.lineTo(700, 400); ctx.lineTo(800, 600);
    ctx.fill();

    // Yer
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.moveTo(0, 600); ctx.lineTo(100, 400); ctx.lineTo(700, 400); ctx.lineTo(800, 600);
    ctx.fill();

    // Ay Işığı (Pencereden süzülen 3D ışık)
    ctx.fillStyle = "rgba(100, 100, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(700, 150); ctx.lineTo(400, 550); ctx.lineTo(650, 580); ctx.lineTo(700, 250);
    ctx.fill();
}

function drawMother(x) {
    // Uzun Anne Figürü (68x110)
    ctx.fillStyle = "#333"; // Elbise
    ctx.fillRect(x, mother.y + 30, mother.w, 80);
    ctx.fillStyle = "#FFE0BD"; // Kafa
    ctx.fillRect(x + 10, mother.y, 48, 40);
    ctx.fillStyle = "#221100"; // Saç
    ctx.fillRect(x + 10, mother.y, 48, 15);
}

function drawUndertaleBox(text) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.fillRect(50, 420, 700, 140);
    ctx.strokeRect(50, 420, 700, 140);

    ctx.fillStyle = "white";
    ctx.font = "20px Courier New";
    
    // Metin Kaydırma (Taşmayı önler)
    const words = text.split(' ');
    let line = '';
    let y = 460;
    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 650) {
            ctx.fillText(line, 80, y);
            line = words[n] + ' ';
            y += 30;
        } else { line = testLine; }
    }
    ctx.fillText(line, 80, y);
    ctx.font = "12px Courier New";
    ctx.fillText("[ DEVAM ETMEK İÇİN 'E' ]", 550, 540);
}

function drawNightmareWorld() {
    // KOYU MAVİ ARKA PLAN
    ctx.fillStyle = "#000033";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // TIRTIKLI YERLER (Zemin Dokusu)
    ctx.strokeStyle = "#000066";
    ctx.lineWidth = 2;
    for(let i=0; i<canvas.width; i+=20) {
        ctx.beginPath();
        ctx.moveTo(i, 400);
        for(let j=0; j<20; j++) {
            ctx.lineTo(i + (j*2), 400 + (j%2==0 ? 10 : -10));
        }
        ctx.stroke();
    }
    
    // Kâbus İfadesi
    drawUndertaleBox(scenes[1].text);
}

function update() {
    if (gameState === 'mother_entry') {
        if (motherPos < 150) motherPos += 2;
        else gameState = 'dialogue';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState !== 'nightmare') {
        drawRoom3D();
        // Yatakta kitap okuyan çocuk
        ctx.fillStyle = "#D4AF37"; ctx.fillRect(player.x, player.y + 20, 64, 44);
        ctx.fillStyle = "#FFE0BD"; ctx.fillRect(player.x + 15, player.y, 34, 30);
        
        if (gameState === 'mother_entry' || gameState === 'dialogue') {
            // Açık Kapı Işığı
            ctx.fillStyle = "#fffae6";
            ctx.fillRect(0, 200, 100, 250);
            drawMother(motherPos);
        }
    }

    if (gameState === 'dialogue') {
        drawUndertaleBox(scenes[0].text);
    }

    if (gameState === 'sleeping') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (gameState === 'nightmare') {
        drawNightmareWorld();
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
    setTimeout(() => { gameState = 'mother_entry'; }, 2000);
});