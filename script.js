const beepSound = new Audio('beepbeepsound.mp3');
const inventoryUI = document.getElementById('inventory'); // Envanterinin ID'si farklıysa burayı düzelt
const character = document.getElementById('character');   // Karakterinin ID'si

// --- 2. KARAKTERİ ÇİMENE SABİTLE ---
// Karakterin tam çimenin (ekranın altı) üzerinde durmasını sağlar
if (character) {
    character.style.position = 'fixed';
    character.style.bottom = '20px'; // Çimenin yüksekliğine göre burayı 0 veya 30 yapabilirsin
    character.style.left = '50%';
    character.style.transform = 'translateX(-50%)';
}

// --- 3. 'E' TUŞU VE ENVANTER MANTIĞI ---
window.addEventListener('keydown', function(event) {
    // Sadece 'E' tuşuna basıldığında çalışır
    if (event.key.toLowerCase() === 'e') {
        
        // Envanterin o anki durumunu kontrol et
        const isHidden = window.getComputedStyle(inventoryUI).display === 'none';

        if (isHidden) {
            // ENVANTERİ AÇ
            inventoryUI.style.display = 'block'; 
            
            // SESİ TETİKLE
            beepSound.currentTime = 0; // Her açılışta sesi başa sar
            beepSound.play().catch(e => console.error("Ses çalınamadı:", e));
            
            console.log("Envanter açıldı, beep sesi çalındı.");
        } else {
            // ENVANTERİ KAPAT
            inventoryUI.style.display = 'none';
            console.log("Envanter kapatıldı.");
        }
    }
});

// --- 4. EKSTRA: OYUN BAŞLADIĞINDA ENVANTER KAPALI OLSUN ---
window.onload = () => {
    inventoryUI.style.display = 'none';
};