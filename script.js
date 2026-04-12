const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// OYUN DURUMLARI: 'intro' (kitap okuma), 'dialogue' (anne konuşuyor), 'sleeping' (geçiş), 'nightmare' (kabus)
let gameState = 'intro';
let dialogueIndex = 0;
let dialogueText = "";

const player = { x: 370, y: 280, w: 64, h: 64 };

// DİYALOGLAR
const scenes = [
    { speaker: "ANNE", text: "Hadi yat artık oğlum, saat çok geç oldu." },
    { speaker: "ÇOCUK", text: "...Tamam anne, yatıyorum." },
    { speaker: "İÇ SES", text: "Bu yatak da hiç rahat hissettirmiyor..." }
];

// KLAVYE
window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'e' || e.key === ' ') {
        advanceDialogue();
    }
});

function playHorrorMusic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.type = 'sine'; // Giriş için daha sakin ama tekinsiz bir ses
    osc.frequency.setValueAtTime(60, audioCtx.currentTime);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
}

function advanceDialogue() {
    if (gameState === 'intro') {
        gameState = 'dialogue';
        dialogueText = scenes[0].text;
    } else if (gameState === 'dialogue') {
        dialogueIndex++;
        if (dialogueIndex < 2) {
            dialogueText = scenes[dialogueIndex].text;
        } else {
            gameState = 'sleeping';
            setTimeout(() => {
                gameState = 'nightmare_intro';
                dialogueText = scenes[2].text;
            }, 3000);
        }
    }
}

function drawUndertaleBox(speaker, text) {
    // Siyah Kutu
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.fillRect(50, 400, 700, 150);
    ctx.strokeRect(50, 400, 700, 150);

    // İsim
    ctx.fillStyle = "white";
    ctx.font = "20px 'Courier New'";
    ctx.fillText(speaker + ":", 70, 440);

    // Metin
    ctx.font = "18px 'Courier New'";
    ctx.fillText(text, 70, 480);
    
    ctx.font = "12px 'Courier New'";
    ctx.fillText("[DEVAM ETMEK İÇİN 'E' BAS]", 580, 530);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'intro' || gameState === 'dialogue') {
        // ODA ÇİZİMİ
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // PENCERE VE AY IŞIĞI
        ctx.fillStyle = "#1a1a3a"; // Pencere camı
        ctx.fillRect(600, 100, 120, 160);
        
        // Ay Işığı Süzülmesi (Yere doğru vuran ışık)
        ctx.beginPath();
        ctx.fillStyle = "rgba(150, 150, 255, 0.1)";
        ctx.moveTo(600, 100);
        ctx.lineTo(200, 600);
        ctx.lineTo(500, 600);
        ctx.lineTo(720, 100);
        ctx.fill();

        // YATAK
        ctx.fillStyle = "#221100";
        ctx.fillRect(350, 250, 120, 180); // Karyola
        ctx.fillStyle = "#444";
        ctx.fillRect(355, 255, 110, 140); // Çarşaf

        // KARAKTER (Linkteki pelerinli çocuk tasviri - kitap okuyor)
        let px = player.x; let py = player.y;
        ctx.fillStyle = "#D4AF37"; ctx.fillRect(px+10, py+20, 44, 44); // Sarı pelerin
        ctx.fillStyle = "#FFE0BD"; ctx.fillRect(px+15, py, 34, 30); // Kafa
        ctx.fillStyle = "#3E2723"; ctx.fillRect(px+15, py, 34, 10); // Saç
        
        // Elinde Kitap
        ctx.fillStyle = "white";
        ctx.fillRect(px + 20, py + 35, 24, 15);
    }

    if (gameState === 'dialogue') {
        drawUndertaleBox("ANNE", dialogueText);
    }

    if (gameState === 'sleeping') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "20px 'Courier New'";
        ctx.fillText("...Zzz...", 370, 300);
    }

    if (gameState === 'nightmare_intro') {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawUndertaleBox("DÜŞÜNCE", dialogueText);
    }
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

playBtn.addEventListener('click', () => {
    playHorrorMusic();
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
    // 2 saniye sonra anne kapıyı açsın (otomatik başlatma)
    setTimeout(() => { if(gameState === 'intro') advanceDialogue(); }, 3000);
});