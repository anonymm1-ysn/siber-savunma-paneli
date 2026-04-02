let points = parseInt(localStorage.getItem('vaultPoints')) || 0;
let currentUser = localStorage.getItem('vaultUser') || "";

let allUsers = JSON.parse(localStorage.getItem('allVaultUsers')) || [
    {name: "Siber_Göz", score: 500}, 
    {name: "Kod_Dostu", score: 250}
];

document.addEventListener('DOMContentLoaded', () => {
    if (currentUser !== "") showPrepArea();
    setupTerminal();
});

function saveUser() {
    let name = document.getElementById('user-name-input').value.trim();
    if(name.length > 1) {
        currentUser = name;
        localStorage.setItem('vaultUser', currentUser);
        
   
        if (!allUsers.find(u => u.name === name)) {
            allUsers.push({name: name, score: points});
            localStorage.setItem('allVaultUsers', JSON.stringify(allUsers));
        }
        showPrepArea();
    }
}

function showPrepArea() {
    document.getElementById('login-screen').style.display = "none";
    document.getElementById('prep-area').style.display = "flex";
    document.getElementById('user-display').innerText = currentUser;
    updateLeaders();
}

function bootVM() {
   
    document.getElementById('prep-area').style.display = "none";
    document.getElementById('vm-fullscreen').style.display = "block";
    document.getElementById('term-tag').innerText = currentUser + "@vault:~$ ";
    document.getElementById('cmd-input').focus();
}

function updateLeaders() {
    const list = document.getElementById('leader-list');
   
    let me = allUsers.find(u => u.name === currentUser);
    if(me) me.score = points;

    let sorted = allUsers.sort((a, b) => b.score - a.score);
    list.innerHTML = sorted.map((u, i) => 
        `<li style="${u.name === currentUser ? 'color:#0f0' : ''}">${i+1}. ${u.name} - ${u.score}</li>`
    ).join('');
}

function toggleLeaders() {
    const win = document.getElementById('leaderboard-win');
    win.style.display = win.style.display === 'none' ? 'block' : 'none';
}

function setupTerminal() {
    document.getElementById('cmd-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = e.target.value;
            const log = document.getElementById('log-box');
            log.innerHTML += `<div><span style="color:#0f0">${currentUser}@vault:~$</span> ${input}</div>`;
          
            if(input.toLowerCase().includes('system.out.println')) {
                log.innerHTML += `<div style="color:#f89820"> [Output]: Başarıyla çalıştırıldı.</div>`;
            }

            e.target.value = "";
            log.scrollTop = log.scrollHeight;
        }
    });
}


setInterval(() => {
    if(currentUser) {
        points += 5;
        localStorage.setItem('vaultPoints', points);
        localStorage.setItem('allVaultUsers', JSON.stringify(allUsers));
        updateLeaders();
    }
}, 30000);