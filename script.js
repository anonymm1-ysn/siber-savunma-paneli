let stats = { hunger: 100, thirst: 100, energy: 100, clean: 100 };
const foxy = document.getElementById('foxy-container');
const bubble = document.getElementById('speech-bubble');

// Yükleme Ekranı Kontrolü
window.onload = () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 2000);
};

function updateStats() {
    document.getElementById('hunger-val').innerText = Math.floor(stats.hunger);
    document.getElementById('thirst-val').innerText = Math.floor(stats.thirst);
    document.getElementById('energy-val').innerText = Math.floor(stats.energy);
    document.getElementById('clean-val').innerText = Math.floor(stats.clean);

    foxy.classList.remove('sleeping', 'happy');

    if (stats.energy <= 0) {
        foxy.classList.add('sleeping');
        showSpeech("Zzz... Çok yorgunum...");
    }
}

function showSpeech(text) {
    bubble.innerText = text;
    bubble.style.opacity = "1";
    setTimeout(() => bubble.style.opacity = "0", 3000);
}

// Aksiyonlar
function feedFoxy() { if(stats.energy > 0) { stats.hunger = Math.min(100, stats.hunger + 25); showSpeech("Nefis!"); updateStats(); } }
function waterFoxy() { if(stats.energy > 0) { stats.thirst = Math.min(100, stats.thirst + 25); showSpeech("Taze su!"); updateStats(); } }
function petFoxy() { if(stats.energy > 0) { foxy.classList.add('happy'); showSpeech("Hehe!"); setTimeout(updateStats, 1000); } }
function washFoxy() { if(stats.energy > 0) { stats.clean = Math.min(100, stats.clean + 40); showSpeech("Mis!"); updateStats(); } }

// Zamanla Azalma
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

// Sürükleme (Vivi Kedi Mantığı)
let isDragging = false;
let ox, oy;

foxy.onmousedown = (e) => {
    isDragging = true;
    ox = e.clientX - foxy.offsetLeft;
    oy = e.clientY - foxy.offsetTop;
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    foxy.style.left = (e.clientX - ox) + "px";
    foxy.style.top = (e.clientY - oy) + "px";
};

document.onmouseup = () => isDragging = false;