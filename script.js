let stats = { hunger: 100, thirst: 100, energy: 100, clean: 100 };
const foxy = document.getElementById('foxy-container');
const bubble = document.getElementById('speech-bubble');

// Yükleme ekranını kapat
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = "0";
        setTimeout(() => document.getElementById('loading-screen').style.display = "none", 500);
    }, 2500);
};

function updateStats() {
    document.getElementById('hunger-val').innerText = Math.floor(stats.hunger);
    document.getElementById('thirst-val').innerText = Math.floor(stats.thirst);
    document.getElementById('energy-val').innerText = Math.floor(stats.energy);
    document.getElementById('clean-val').innerText = Math.floor(stats.clean);

    foxy.classList.remove('sleeping');
    if (stats.energy <= 0) {
        foxy.classList.add('sleeping');
        showSpeech("Zzz...");
    }
}

function showSpeech(text) {
    bubble.innerText = text;
    bubble.style.opacity = "1";
    setTimeout(() => bubble.style.opacity = "0", 3000);
}

// Aksiyonlar
function feedFoxy() { stats.hunger = Math.min(100, stats.hunger + 25); showSpeech("Nefis!"); updateStats(); }
function waterFoxy() { stats.thirst = Math.min(100, stats.thirst + 25); showSpeech("Ferah!"); updateStats(); }
function petFoxy() { stats.energy = Math.min(100, stats.energy + 10); showSpeech("Hehe!"); updateStats(); }
function washFoxy() { stats.clean = Math.min(100, stats.clean + 30); showSpeech("Paklandım!"); updateStats(); }

// Acıkma Döngüsü
setInterval(() => {
    if (stats.energy > 0) {
        stats.hunger = Math.max(0, stats.hunger - 2);
        stats.thirst = Math.max(0, stats.thirst - 3);
        stats.energy = Math.max(0, stats.energy - 1);
    } else {
        stats.energy = Math.min(100, stats.energy + 5);
    }
    updateStats();
}, 5000);

// Sürükleme Sistemi
let isDragging = false;
let ox, oy;

foxy.onmousedown = (e) => {
    isDragging = true;
    foxy.classList.add('dragging');
    ox = e.clientX - foxy.offsetLeft;
    oy = e.clientY - foxy.offsetTop;
    foxy.style.transition = "none";
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    foxy.style.left = (e.clientX - ox) + "px";
    foxy.style.top = (e.clientY - oy) + "px";
};

document.onmouseup = () => {
    isDragging = false;
    foxy.classList.remove('dragging');
    foxy.style.transition = "transform 0.1s ease";
};