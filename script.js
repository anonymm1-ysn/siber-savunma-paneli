const invBeep = new Audio('beepbeepsound.mp3');

// 'E' tuşu dinleyicisi
window.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'e') {
        
        // Senin envanter panelinin ID'si neyse onu buraya yaz (Örn: 'inventory')
        const inventoryPanel = document.getElementById('inventory-container'); 
        
        // Görünürlüğü değiştir (toggle)
        if (inventoryPanel.style.display === 'none' || inventoryPanel.style.display === '') {
            inventoryPanel.style.display = 'block'; // Aç
            
            // AÇILDIĞINDA SES ÇAL
            invBeep.currentTime = 0; 
            invBeep.play().catch(err => console.log("Ses çalma engellendi: ", err));
            
        } else {
            inventoryPanel.style.display = 'none'; // Kapat
        }
    }
});