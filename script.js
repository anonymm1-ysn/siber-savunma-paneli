let points = parseInt(localStorage.getItem('userPoints')) || 0;
let currentUser = localStorage.getItem('userName') || "";
let botData = [
    { name: "AppBee_Mod", score: 600 },
    { name: "CyberExpert", score: 450 },
    { name: "Elite_Dev", score: 300 }
];

document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) showDesktop();
    setupTerminal();
});

function authLogin(provider) {
    let email = prompt(`${provider} Hesabınız (Örn: ahmet@gmail.com):`);
    if(email && email.includes('@')) {
        currentUser = email.split('@')[0];
        localStorage.setItem('userName', currentUser);
        showDesktop();
    }
}

function checkPass() {
    const pass = document.getElementById('login-pass').value;
    if(pass === "1234") {
        currentUser = "Admin_Ahmet";
        localStorage.setItem('userName', currentUser);
        showDesktop();
    } else {
        document.getElementById('login-error').innerText = "Hata: Geçersiz şifre!";
    }
}

function showDesktop() {
    document.getElementById('login-screen').style.display = "none";
    document.getElementById('desktop').style.display = "flex";
    document.getElementById('welcome-name').innerText = currentUser;
    updateLeaderboard();
}

function startVirtualMachine() {
    // Dağ ekranını gizle, Windows 8'i göster
    document.getElementById('desktop').style.display = 'none';
    document.getElementById('vm-fullscreen').style.display = 'block';
    document.getElementById('term-tag').innerText = currentUser + "@win8:~$";
}

function powerOffVM() {
    // Windows 8'i kapat, dağ ekranına geri dön
    if(confirm("Sanal Makineyi kapatmak istiyor musunuz?")) {
        document.getElementById('vm-fullscreen').style.display = 'none';
        document.getElementById('desktop').style.display = 'flex';
    }
}

function setupTerminal() {
    const area = document.getElementById('cmd-input');
    area.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            runCommand();
        }
        // Otomatik satır yüksekliği
        area.style.height = 'auto';
        area.style.height = area.scrollHeight + 'px';
    });
}

function runCommand() {
    const input = document.getElementById('cmd-input');
    const box = document.getElementById('log-box');
    const text = input.value.trim();
    if (!text) return;

    box.innerHTML += `<div><span style="color:#0f0">${currentUser}@win8:~$</span> ${text.replace(/\n/g, '<br>')}</div>`;

    // Komut Mantığı
    if (text.toLowerCase().includes('print')) {
        box.innerHTML += `<div style="color:cyan;">[Output]: ${text.split('print')[1]}</div>`;
    } else if (text.toLowerCase() === 'scan') {
        box.innerHTML += `<div style="color:gray;">Scanning virtual nodes... [SECURE]</div>`;
    } else {
        box.innerHTML += `<div style="color:red;">Komut simüle edildi.</div>`;
    }

    input.value = "";
    input.style.height = 'auto';
    box.scrollTop = box.scrollHeight;
}

function updateLeaderboard() {
    const list = document.getElementById('leader-list');
    let all = [...botData];
    if (currentUser) all.push({ name: currentUser, score: points });
    all.sort((a, b) => b.score - a.score);
    
    list.innerHTML = all.map((u, i) => 
        `<li style="${u.name === currentUser ? 'color:#0f0; font-weight:bold;' : ''}">${i+1}. ${u.name}: ${u.score}</li>`
    ).join('');
    document.getElementById('user-points').innerText = points;
}

function openWindow(id) { document.getElementById(id).style.display = 'block'; }
function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

// Puan ve Saat
setInterval(() => {
    if(currentUser) {
        points += 5;
        localStorage.setItem('userPoints', points);
        updateLeaderboard();
    }
}, 1800000);

setInterval(() => {
    const clock = document.getElementById('live-clock');
    if(clock) clock.innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);