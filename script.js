const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// OYUNCU AYARLARI (Senin linkindeki 64x64 karaktere göre uyarlandı)
const player = {
    x: 400,
    y: 300,
    w: 64, // Genişlik
    h: 64, // Yükseklik
    speed: 4,
    color: "#FFD700" // Karakterin baskın sarı/altın rengi
};

// DUVARLAR (Dört tarafı kapatıyoruz ki dışarı çıkıp yok olmasın)
const walls = [
    { x: 0, y: 0, w: 800, h: 20 },      // Üst Duvar
    { x: 0, y: 580, w: 800, h: 20 },    // Alt Duvar
    { x: 0, y: 0, w: 20, h: 600 },      // Sol Duvar
    { x: 780, y: 0, w: 20, h: 600 }     // Sağ Duvar
];

const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Korku Müziği (VHS Uğultusu)
function playHorrorMusic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
}

// ÇARPIŞMA KONTROLÜ (Duvarın içine girmeyi engeller)
function checkCollision(nextX, nextY) {
    for (let wall of walls) {
        if (nextX < wall.x + wall.w &&
            nextX + player.w > wall.x &&
            nextY < wall.y + wall.h &&
            nextY + player.h > wall.y) {
            return true; // Çarpışma var
        }
    }
    return false; // Yol temiz
}

function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys['w']) newY -= player.speed;
    if (keys['s']) newY += player.speed;
    if (keys['a']) newX -= player.speed;
    if (keys['d']) newX += player.speed;

    // Eğer yeni koordinatlarda duvar yoksa hareket et
    if (!checkCollision(newX, player.y)) {
        player.x = newX;
    }
    if (!checkCollision(player.x, newY)) {
        player.y = newY;
    }
}

function draw() {
    // Karanlık Zemin
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Duvarları Çiz (Görünür olması için koyu gri)
    ctx.fillStyle = "#1a1a1a";
    walls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

    // YENİ PİKSEL KARAKTER ÇİZİMİ (Verdiğin linkteki karaktere benzetildi)
    let px = player.x; 
    let py = player.y;

    // Pelerin/Gövde
    ctx.fillStyle = "#D4AF37"; // Altın sarısı pelerin
    ctx.fillRect(px + 16, py + 20, 32, 36);
    
    // Kafa
    ctx.fillStyle = "#FFE0BD"; // Ten rengi
    ctx.fillRect(px + 20, py + 4, 24, 20);
    
    // Saçlar
    ctx.fillStyle = "#3E2723"; // Koyu kahve saç
    ctx.fillRect(px + 20, py, 24, 6);

    // Gözler (Karakterin gizemli bakışı)
    ctx.fillStyle = "black";
    ctx.fillRect(px + 26, py + 12, 4, 4);
    ctx.fillRect(px + 36, py + 12, 4, 4);

    // Gölgelendirme (Pelerin detayı)
    ctx.fillStyle = "#B8860B";
    ctx.fillRect(px + 28, py + 24, 8, 30);
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