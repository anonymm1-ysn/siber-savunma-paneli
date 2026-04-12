const startBtn = document.getElementById('start-btn');
const exitBtn = document.getElementById('exit-btn');
const vhsContainer = document.querySelector('.vhs-machine');

// --- ÇIKIŞ BUTONU ---
exitBtn.addEventListener('click', () => {
    // Tarayıcı izin verirse sekmeyi kapatır, vermezse uyarı verir
    if (confirm("Kasetten çıkmak istiyor musun?")) {
        window.close();
        // window.close çalışmazsa (güvenlik nedeniyle) kullanıcıyı gönder:
        window.location.href = "about:blank"; 
    }
});

// --- OYNAT (BAŞLAT) BUTONU ---
startBtn.addEventListener('click', () => {
    // Analog Ses Efekti Başlat (Web Audio API)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();

    // Ekranı Karart ve Oyuna Hazırlan
    vhsContainer.style.transition = "opacity 1.5s ease-in-out";
    vhsContainer.style.opacity = "0";

    setTimeout(() => {
        vhsContainer.style.display = "none";
        console.log("Menü kapandı, oyun motoru bekleniyor...");
        // Bir sonraki adımda buraya oyunun ana fonksiyonunu çağıracağız.
    }, 1500);
});