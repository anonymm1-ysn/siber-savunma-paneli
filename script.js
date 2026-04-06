
let stats = {
    hunger: 100, thirst: 100, energy: 100, clean: 100
};

const foxy = document.getElementById('foxy-container');
const img = document.getElementById('foxy-img');
const bubble = document.getElementById('speech-bubble');

// Başlangıç Pozisyonu (Ekranın ortası)
foxy.style.left = (window.innerWidth / 2 - 60) + "px";
foxy.style.top = (window.innerHeight / 2 - 60) + "px";

// --- ANA DÖNGÜ VE GÜNCELLEME ---

function updateStats() {
    // Arayüzdeki değerleri güncelle
    document.getElementById('hunger-val').innerText = stats.hunger;
    document.getElementById('thirst-val').innerText = stats.thirst;
    document.getElementById('energy-val').innerText = stats.energy;
    document.getElementById('clean-val').innerText = stats.clean;

    // Durum Kontrolleri
    foxy.classList.remove('sleeping', 'happy');

    if (stats.energy <= 0) {
        foxy.classList.add('sleeping'); // Yan yatıp uyu
        showSpeech("Horrr... Zzz...");
    } else if (stats.hunger <= 20) {
        showSpeech("Çok acıktım Ahmet!");
    } else if (stats.thirst <= 20) {
        showSpeech("Su... Lütfen...");
    } else if (stats.clean <= 20) {
        showSpeech("Kaşınıyorum, yıka beni!");
    }
}

// Konuşma Balonu
function showSpeech(text) {
    bubble.innerText = text;
    bubble.style.opacity = "1";
    setTimeout(() => bubble.style.opacity = "0", 3000); // 3 saniye sonra gizle
}

// --- ETKİLEŞİM AKSİYONLARI ---

function feedFoxy() {
    if (stats.energy > 0) {
        stats.hunger = Math.min(100, stats.hunger + 30);
        showSpeech("Yummy! Harika kemik.");
        updateStats();
    }
}

function waterFoxy() {
    if (stats.energy > 0) {
        stats.thirst = Math.min(100, stats.thirst + 30);
        showSpeech("Lık lık... Serinledim.");
        updateStats();
    }
}

function petFoxy() {
    if (stats.energy > 0) {
        stats.energy = Math.min(100, stats.energy + 10);
        foxy.classList.add('happy'); // Mutlu animasyonu başlat
        showSpeech("Mırrr... Çok güzel.");
        setTimeout(updateStats, 1500); // 1.5 sn sonra normale dön
    }
}

function washFoxy() {
    if (stats.energy > 0) {
        stats.clean = Math.min(100, stats.clean + 40);
        stats.energy = Math.max(0, stats.energy - 10); // Yıkanmak yorar
        showSpeech("Şap şup! Tertemiz oldum.");
        updateStats();
    }
}

// --- ZAMANLAYICILAR (Arka Planda Acıkma/Yorulma) ---

// Her 5 saniyede bir durumlar azalır
setInterval(() => {
    if (stats.energy > 0) {
        stats.hunger = Math.max(0, stats.hunger - 3);
        stats.thirst = Math.max(0, stats.thirst - 4);
        stats.clean = Math.max(0, stats.clean - 2);
        stats.energy = Math.max(0, stats.energy - 1); // Gezdikçe yorulur
    } else {
        // Uyurken enerji yavaşça dolar
        stats.energy = Math.min(100, stats.energy + 5);
    }
    updateStats();
}, 5000);

// --- SÜRÜKLEME VE BIRAKMA (Taşıma Mantığı) ---

let isDragging = false;
let offsetX, offsetY;

foxy.addEventListener('mousedown', (e) => {
    isDragging = true;
    foxy.style.transition = "none"; // Taşırken gecikmeyi kapat
    
    // Fare imlecinin tilki üzerindeki konumunu hesapla
    offsetX = e.clientX - foxy.offsetLeft;
    offsetY = e.clientY - foxy.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Yeni konumu hesapla
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    
    // Ekran sınırlarını kontrol et (Dışarı kaçmasın)
    const maxX = window.innerWidth - foxy.offsetWidth;
    const maxY = window.innerHeight - foxy.offsetHeight;
    
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    foxy.style.left = x + "px";
    foxy.style.top = y + "px";
    
    // Hareket ederken enerji harcar
    if (stats.energy > 0) stats.energy = Math.max(0, stats.energy - 0.2); 
    updateStats();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    foxy.style.transition = "transform 0.1s ease"; // Taşıma bitince geçişi aç
});

// İlk Çalıştırma
updateStats();