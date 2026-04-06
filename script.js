const fox = document.getElementById('fox');
const foxImg = document.getElementById('fox-img');
const bubble = document.getElementById('bubble');
const eFill = document.getElementById('e-fill');
const hFill = document.getElementById('h-fill');

let stats = { energy: 100, hunger: 100 };
let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let target = { x: pos.x, y: pos.y };
let isDragging = false;

// Bulut Tabanlı Profesyonel Animasyon Linkleri
const ANIMATIONS = {
    run: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXByeXJueXByeXJueXByeXJueXByeXJueXByeXJueXByJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCBmcm9tX2dpZmZ5JmN0PWc/3o7TKSjRrfIPjeiVyM/giphy.gif",
    idle: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmNudTFqcXUwdXp5bmZ1bmx0eWltYXU5eXoxbmV3YnhueGt6eGZlbXImZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/Ym7YvPVA9hH56/giphy.gif",
    sleep: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVpazZpZzh6czY1Z3FmaXN4YnFobG1reGd1eHgyaGxpa2Q1bmJ4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VvXg0VkS6A2I/giphy.gif"
};

// 1. AÇILIŞ SİSTEMİ (BOOTING)
let loadVal = 0;
const boot = setInterval(() => {
    loadVal += Math.random() * 15;
    if (loadVal > 100) loadVal = 100;
    document.getElementById('load-bar').style.width = loadVal + "%";

    if (loadVal >= 100) {
        clearInterval(boot);
        document.getElementById('loader').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('loader').remove();
            startSimulation();
        }, 800);
    }
}, 100);

// 2. FİZİK MOTORU (60FPS HAREKET)
function physicsEngine() {
    if (!isDragging && stats.energy > 0) {
        // Hedefe yumuşak takip (Lerp)
        pos.x += (target.x - pos.x) * 0.04;
        pos.y += (target.y - pos.y) * 0.04;

        fox.style.left = pos.x + "px";
        fox.style.top = pos.y + "px";

        // Yön Tayini
        const diff = target.x - pos.x;
        if (Math.abs(diff) > 3) {
            fox.style.transform = `scaleX(${diff > 0 ? 1 : -1})`;
        }
    }
    requestAnimationFrame(physicsEngine);
}
physicsEngine();

// 3. AI KARAR MEKANİZMASI
function startSimulation() {
    setInterval(() => {
        if (isDragging || stats.energy <= 0) return;

        const decision = Math.random();

        if (decision > 0.65) {
            // Harekete Geç
            target.x = Math.random() * (window.innerWidth - 200);
            target.y = Math.random() * (window.innerHeight - 200);
            foxImg.src = ANIMATIONS.run;
            say("Doğada keşfe çıkıyorum! 🌲");
        } else {
            // Dinlen
            foxImg.src = ANIMATIONS.idle;
        }

        // İstatistikleri Gerçekçi Düşür
        stats.energy = Math.max(0, stats.energy - 3);
        stats.hunger = Math.max(0, stats.hunger - 4);
        
        if (stats.energy <= 0) {
            foxImg.src = ANIMATIONS.sleep;
            say("Enerjim bitti... Uyuyorum 💤");
        }
        updateHUD();
    }, 4500);
}

// 4. YARDIMCI FONKSİYONLAR
function say(txt) {
    bubble.innerText = txt;
    bubble.style.opacity = "1";
    setTimeout(() => { if(!isDragging) bubble.style.opacity = "0"; }, 3000);
}

function updateHUD() {
    eFill.style.width = stats.energy + "%";
    hFill.style.width = stats.hunger + "%";
}

function feed() {
    if (stats.energy <= 0) {
        stats.energy = 50;
        foxImg.src = ANIMATIONS.idle;
    }
    stats.hunger = 100;
    stats.energy = Math.min(100, stats.energy + 15);
    say("Nefis! Teşekkürler Ahmet 🍖");
    updateHUD();
}

// 5. ETKİLEŞİM (SÜRÜKLEME)
fox.onmousedown = (e) => {
    isDragging = true;
    const shiftX = e.clientX - fox.offsetLeft;
    const shiftY = e.clientY - fox.offsetTop;
    foxImg.src = ANIMATIONS.idle;

    document.onmousemove = (moveE) => {
        pos.x = moveE.pageX - shiftX;
        pos.y = moveE.pageY - shiftY;
        fox.style.left = pos.x + "px";
        fox.style.top = pos.y + "px";
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        isDragging = false;
        target.x = pos.x;
        target.y = pos.y;
        say("Hahaha, gıdıklandım!");
    };
};