const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    x: 400, y: 300,
    w: 32, h: 48, // 64x64'e oturacak Frisk benzeri oran
    speed: 3,
    color: "#e3c1b4"
};

const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// --- ADIM 1: KORKU KASEDİ SESİ (Synth) ---
function playHorrorMusic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Alt katman: Drone (Uğultu)
    const drone = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();
    drone.type = 'brownian'; // Kahverengi gürültü hissi için pes sawtooth
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(40, audioCtx.currentTime);
    droneGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    
    // Titreme Efekti (LFO)
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.5, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(5, audioCtx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(drone.frequency);
    drone.connect(droneGain);
    droneGain.connect(audioCtx.destination);
    
    drone.start();
    lfo.start();
}

// --- ADIM 2: HAREKET VE DUVAR SİSTEMİ ---
const wall = { x: 200, y: 150, w: 400, h: 20 }; // Örnek bir duvar

function update() {
    let nextX = player.x;
    let nextY = player.y;

    if (keys['w']) nextY -= player.speed;
    if (keys['s']) nextY += player.speed;
    if (keys['a']) nextX -= player.speed;
    if (keys['d']) nextX += player.speed;

    // Duvar Çarpışma Kontrolü (Basit Fizik)
    if (nextX < wall.x + wall.w && nextX + player.w > wall.x &&
        nextY < wall.y + wall.h && nextY + player.h > wall.y) {
        // Çarpışma var! Hareket etme.
    } else {
        // Çarpışma yok, pozisyonu güncelle
        player.x = nextX;
        player.y = nextY;
    }
}

function draw() {
    // 1. Zemin (Piksel Arka Plan)
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Zemin Dokusu (Piksel pikselli bir yer görünümü)
    ctx.fillStyle = "#0f0f0f";
    for(let i=0; i<canvas.width; i+=40) {
        for(let j=0; j<canvas.height; j+=40) {
            ctx.fillRect(i, j, 38, 38);
        }
    }

    // 2. Duvarı Çiz
    ctx.fillStyle = "#333";
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);

    // 3. PİKSEL KARAKTER (Frisk Tarzı)
    let px = player.x; let py = player.y;
    
    // Saç/Kafa
    ctx.fillStyle = "#4d2b1a"; ctx.fillRect(px+4, py, 24, 8); // Saç üst
    ctx.fillStyle = player.color; ctx.fillRect(px+4, py+8, 24, 16); // Yüz
    
    // Gözler (Korkmuş çizgiler)
    ctx.fillStyle = "#000"; ctx.fillRect(px+8, py+14, 4, 2); ctx.fillRect(px+20, py+14, 4, 2);
    
    // Kazak (Frisk stili)
    ctx.fillStyle = "#5e4fa2"; ctx.fillRect(px, py+24, 32, 16); // Mor/Mavi gövde
    ctx.fillStyle = "#f7941d"; ctx.fillRect(px, py+28, 32, 4); // Şerit
    
    // Pantolon/Ayaklar
    ctx.fillStyle = "#2b2b2b"; ctx.fillRect(px+4, py+40, 24, 8);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

playBtn.addEventListener('click', () => {
    playHorrorMusic();
    menuScreen.style.display = "none";
    canvas.style.display = "block";
    gameLoop();
});