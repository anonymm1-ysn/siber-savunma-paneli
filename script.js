const char = document.getElementById('character');
const song = document.getElementById('music'); // HTML'deki audio id'si
let isJumping = false;

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // 1. YÖNLER (Resmi ayna gibi döndürür)
    if (key === 'a') {
        char.style.transform = 'translateX(-50%) scaleX(-1)'; // Sola bak
    } else if (key === 'd') {
        char.style.transform = 'translateX(-50%) scaleX(1)';  // Sağa bak
    }

    // 2. ZIPLAMA (Space)
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        
        // Müzik Başlasın
        song.currentTime = 0;
        song.play();

        // Zıplama Hareketi
        char.style.bottom = '220px'; // Zıplama yüksekliği

        setTimeout(() => {
            char.style.bottom = '85px'; // Yere geri iniş
            setTimeout(() => { isJumping = false; }, 300);
        }, 300);
    }
});