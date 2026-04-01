let points = parseInt(localStorage.getItem('vaultPoints')) || 0;
let currentUser = localStorage.getItem('vaultUser') || "";

let botData = [{name: "Siber_Göz", score: 450}, {name: "Kod_Ustadı", score: 200}];

document.addEventListener('DOMContentLoaded', () => {
 
    if (currentUser !== "") {
        showDesktop();
    }
    setupTerminal();
});

function saveUser() {
    let name = document.getElementById('user-name-input').value.trim();
    if(name.length > 1) {
        currentUser = name;
        localStorage.setItem('vaultUser', currentUser); 
        localStorage.setItem('vaultPoints', points);
        showDesktop();
    } else {
        alert("Geçerli bir isim girin!");
    }
}

function showDesktop() {
    document.getElementById('login-screen').style.display = "none";
    document.getElementById('desktop-bg').style.display = "flex";
    document.getElementById('welcome-name').innerText = currentUser;
    updateLeaderboard();
}

function startVirtualMachine() {
    document.getElementById('desktop-bg').style.display = 'none';
    document.getElementById('vm-fullscreen').style.display = 'block';
    document.getElementById('term-tag').innerText = currentUser + "@vault:~$";
}

function openFullTerminal() { 
    document.getElementById('terminal-fullscreen').style.display = 'flex'; 
    document.getElementById('cmd-input').focus();
}

function closeFullTerminal() { 
    document.getElementById('terminal-fullscreen').style.display = 'none'; 
}

function setupTerminal() {
    const area = document.getElementById('cmd-input');
    area.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            runCommand();
        }
    });
}

function runCommand() {
    const input = document.getElementById('cmd-input');
    const box = document.getElementById('log-box');
    const text = input.value.trim();
    if (!text) return;

    box.innerHTML += `<div><span style="color:#0f0">${currentUser}@vault:~$</span> ${text}</div>`;

    if (text.toLowerCase().startsWith('system.out.println')) {
        const match = text.match(/\(([^)]+)\)/);
        const output = match ? match[1].replace(/['"]/g, '') : "Syntax Error: ; expected";
        box.innerHTML += `<div style="color:#f89820; padding-left:15px;">[Java Output]: ${output}</div>`;
    } 
    else if (text.toLowerCase() === 'clear') {
        box.innerHTML = "";
    } else {
        box.innerHTML += `<div style="color:#444;">Komut işlendi.</div>`;
    }

    input.value = "";
    box.scrollTop = box.scrollHeight;
}

function updateLeaderboard() {
    const list = document.getElementById('leader-list');
  
    let all = [...botData, { name: currentUser, score: points }].sort((a, b) => b.score - a.score);
    
    list.innerHTML = all.map((u, i) => 
        `<li style="${u.name === currentUser ? 'color:#0f0; font-weight:bold;' : ''}">${i+1}. ${u.name} - ${u.score}</li>`
    ).join('');
    document.getElementById('user-points').innerText = points;
}

function toggleReadme() {
    const r = document.getElementById('readme-win');
    r.style.display = (r.style.display === 'none' || r.style.display === '') ? 'block' : 'none';
}

function powerOffVM() {
    document.getElementById('vm-fullscreen').style.display = 'none';
    document.getElementById('desktop-bg').style.display = 'flex';
}

setInterval(() => {
    if(currentUser) {
        points += 10;
        localStorage.setItem('vaultPoints', points);
        updateLeaderboard();
    }
}, 60000); 

setInterval(() => {
    const clock = document.getElementById('live-clock');
    if(clock) clock.innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);