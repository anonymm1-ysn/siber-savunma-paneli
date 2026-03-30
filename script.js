let points = 0;
let secondsTracked = 0;
let currentUser = "";
const bannedWords = ["aptal", "salak", "manyak", "kötü", "çirkin", "ezik", "noob", "küfür"]; 

let botNames = ["CyberGhost", "EliteHacker", "DataViper", "NullPointer", "ShadowCode", "BinaryBeast", "RootUser"];
let leaderboardData = botNames.map((name, index) => ({ name: name, score: 500 - (index * 50), isBot: true }));


function checkLogin() {
    const nameInput = document.getElementById('user-name-input').value.trim();
    const passInput = document.getElementById('login-pass').value;
    const errorDiv = document.getElementById('login-error');

    if(!nameInput) {
        errorDiv.innerText = "Sistem için bir isim gerekli.";
        return;
    }

    const hasBannedWord = bannedWords.some(word => nameInput.toLowerCase().includes(word));
    if(hasBannedWord) {
        errorDiv.innerText = "UYARI: Bu isim sistem kurallarına aykırı!";
        return;
    }

    if(passInput === "1234") {
        currentUser = nameInput;
        leaderboardData.push({ name: currentUser, score: 0, isBot: false });
        
        
        document.getElementById('login-screen').style.display = "none";
        document.getElementById('desktop').style.display = "block";
        
        document.getElementById('prompt-label').innerText = `${currentUser}@secure:~$`;
        
        updateLeaderboard();
    } else {
        errorDiv.innerText = "ŞİFRE HATALI: Erişim Reddedildi.";
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const cmdInput = document.getElementById('cmd-input');
    if(cmdInput) {
        cmdInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') runCommand(); });
    }
});

function openWindow(id) { document.getElementById(id).style.display = 'block'; }
function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

function runCommand() {
    const input = document.getElementById('cmd-input');
    const box = document.getElementById('log-box');
    const cmd = input.value.trim();
    if (!cmd) return;

    box.innerHTML += `<div><span style="color:#0f0">${currentUser}@secure:~$</span> ${cmd}</div>`;

    if(cmd.startsWith('print(')) {
        const text = cmd.match(/\(([^)]+)\)/) ? cmd.match(/\(([^)]+)\)/)[1].replace(/['"]/g, '') : "Syntax Error";
        box.innerHTML += `<div style="color:#ffd43b;">[Python]: ${text}</div>`;
    } 
    else if(cmd.startsWith('System.out.println(')) {
        const text = cmd.match(/\(([^)]+)\)/) ? cmd.match(/\(([^)]+)\)/)[1].replace(/['"]/g, '') : "Java Error";
        box.innerHTML += `<div style="color:#f89820;">[Java]: ${text}</div>`;
    }
    else if(cmd.toLowerCase() === "help") {
        box.innerHTML += "<div style='color:#888'>Komutlar: print(), System.out.println(), scan, open vault, clear</div>";
    }
    else if(cmd.toLowerCase() === "scan") {
        box.innerHTML += "<div style='color:cyan'>[OK] AppBee motoru sistemi taradı.</div>";
    }
    else if(cmd.toLowerCase() === "clear") { box.innerHTML = ""; }
    else { box.innerHTML += "<div style='color:red'>Komut bulunamadı.</div>"; }

    input.value = "";
    box.scrollTop = box.scrollHeight;
}

function updateLeaderboard() {
    const list = document.getElementById('leader-list');
    if(!list) return;
    leaderboardData.sort((a, b) => b.score - a.score);
    list.innerHTML = "";
    leaderboardData.forEach((user, index) => {
        const li = document.createElement('li');
        if(!user.isBot) li.classList.add('real-user');
        li.innerHTML = `<span>${index + 1}. ${user.name}</span> <span>${user.score} PT</span>`;
        list.appendChild(li);
    });
}

setInterval(() => {
    if(document.getElementById('desktop').style.display === "none") return;
    
    secondsTracked++;
    const clock = document.getElementById('live-clock');
    if(clock) clock.innerText = new Date().toLocaleTimeString();

    const timer = document.getElementById('session-timer');
    if(timer) {
        const mins = Math.floor(secondsTracked / 60);
        const secs = secondsTracked % 60;
        timer.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    if(secondsTracked % 1800 === 0) { 
        points += 5;
        document.getElementById('user-points').innerText = points;
        let me = leaderboardData.find(u => u.name === currentUser);
        if(me) { me.score = points; updateLeaderboard(); }
    }
}, 1000);

function dragElement(header) {
    const elmnt = header.parentElement;
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    header.onmousedown = (e) => {
        p3 = e.clientX; p4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; p2 = p4 - e.clientY; p3 = e.clientX; p4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - p2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - p1) + "px";
        };
    };
}