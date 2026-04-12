const playBtn = document.getElementById('play-btn');
const menuScreen = document.getElementById('menu-screen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Temel Karakter Bilgileri
const player = {
    x: 400,
    y: 300,
    size: 40,
    speed: 5
};

const keys = {};

// Tuş Takibi
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// PLAY Butonuna Basınca
playBtn.addEventListener('click', () => {
    menuScreen.style.opacity = "0";
    setTimeout(() => {
        menuScreen.style.display = "none";
        canvas.style.display = "block";
        gameLoop();
    }, 1000); // 1 saniye sonra kâbus başlar
});

function update() {
    // Temel Yürüme Motoru (W,A,S,D)
    if (keys['w']) player.y -= player.speed;
    if (keys['s']) player.y += player.speed;
    if (keys['a']) player.x -= player.speed;
    if (keys['d']) player.x += player.speed;
}

function draw() {
    // Ekranı temizle
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Karakter Temeli (Şimdilik beyaz bir kare)
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}