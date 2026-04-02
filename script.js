let userName = "";

// 1. GİRİŞ FONKSİYONU
function doLogin() {
    const input = document.getElementById('user-input');
    if(input.value.trim().length > 0) {
        userName = input.value.trim();
        document.getElementById('login-screen').style.display = "none";
        document.getElementById('prep-area').style.display = "flex";
        document.getElementById('display-name').innerText = userName;
    } else {
        alert("Lütfen bir kullanıcı adı girin!");
    }
}

// 2. SİSTEMİ BAŞLATMA
function startOS() {
    document.getElementById('prep-area').style.display = "none";
    document.getElementById('vm-desktop').style.display = "flex";
    document.getElementById('prompt-tag').innerText = userName + "@vault:~$";
    
    // Açılışta Readme'yi göster
    showApp('win-readme');
}

// 3. PENCERE KONTROLLERİ
function showApp(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    // Pencereyi en üste getir (Z-index yönetimi)
    win.style.zIndex = Math.floor(Date.now() / 1000);
}

function hideApp(id) {
    document.getElementById(id).style.display = 'none';
}

// 4. CHROME NAVİGASYON
function goUrl() {
    let url = document.getElementById('url-bar').value;
    if(!url.startsWith('http')) {
        url = 'https://' + url;
    }
    document.getElementById('browser-frame').src = url;
}

// 5. TERMINAL MANTIĞI
document.getElementById('terminal-in').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value;
        const out = document.getElementById('terminal-out');
        
        // Komutu ekrana bas
        out.innerHTML += `<div><span style="color:#0f0">${userName}@vault:~$</span> ${cmd}</div>`;
        
        // Java simülasyonu (system.out.println)
        if(cmd.toLowerCase().startsWith('system.out.println')) {
            const match = cmd.match(/\(([^)]+)\)/);
            const msg = match ? match[1].replace(/['"]/g, '') : "Hata: Parantez içinde mesaj bulunamadı!";
            out.innerHTML += `<div style="color:#f89820; padding-left:15px;">[JAVA OUTPUT]: ${msg}</div>`;
        } else if(cmd.toLowerCase() === 'clear') {
            out.innerHTML = "";
        }
        
        this.value = "";
        out.scrollTop = out.scrollHeight;
    }
});

// 6. PAINT ÇİZİM MANTIĞI
const canvas = document.getElementById('paint-box');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => { drawing = false; ctx.beginPath(); };
canvas.onmousemove = (e) => {
    if (!drawing) return;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    
    // Pencere içindeki konumu hesapla
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
};

// 7. SAAT GÜNCELLEME
setInterval(() => {
    const now = new Date();
    document.getElementById('os-clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);