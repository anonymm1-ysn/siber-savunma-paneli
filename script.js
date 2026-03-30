let points = 0;
let secondsTracked = 0;
let botNames = ["CyberGhost", "EliteHacker", "DataViper", "NullPointer", "ShadowCode", "BinaryBeast", "RootUser"];
let leaderboardData = botNames.map((name, index) => ({ 
    name: name, 
    score: 500 - (index * 50), 
    isBot: true 
}));
leaderboardData.push({ name: "Ahmet_DEV", score: 0, isBot: false });

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cmd-input');
    if(input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runCommand();
        });
    }
    updateLeaderboard();
});

function openWindow(id) { document.getElementById(id).style.display = 'block'; }
function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

function runCommand() {
    const input = document.getElementById('cmd-input');
    const box = document.getElementById('log-box');
    const fullCmd = input.value.trim();
    if (fullCmd === "") return;

    box.innerHTML += `<div><span style="color:#0f0">admin@secure:~$</span> ${fullCmd}</div>`;

    if(fullCmd.startsWith('print(')) {
        const match = fullCmd.match(/\(([^)]+)\)/);
        const text = match ? match[1].replace(/['"]/g, '') : "SyntaxError";
        box.innerHTML += `<div style="color:#ffd43b; padding-left:10px;">[Python]: ${text}</div>`;
    } 
    else if(fullCmd.startsWith('System.out.println(')) {
        const match = fullCmd.match(/\(([^)]+)\)/);
        const text = match ? match[1].replace(/['"]/g, '') : "Java Error";
        box.innerHTML += `<div style="color:#f89820; padding-left:10px;">[Java]: ${text}</div>`;
    }
    else if(fullCmd.toLowerCase() === "help") {
        box.innerHTML += "<div style='color:#aaa'>print(), System.out.println(), scan, open vault, clear</div>";
    }
    else if(fullCmd.toLowerCase() === "scan") {
        box.innerHTML += "<div style='color:cyan'>[OK] Sistem %100 Güvenli.</div>";
    }
    else if(fullCmd.toLowerCase() === "clear") {
        box.innerHTML = "";
    }
    else {
        box.innerHTML += "<div style='color:red'>Hata: Komut anlaşılamadı.</div>";
    }

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
        if(index < 3) li.classList.add(`rank-${index+1}`);
        if(!user.isBot) li.classList.add('real-user');
        li.innerHTML = `<span>${index + 1}. ${user.name}</span> <span>${user.score} PT</span>`;
        list.appendChild(li);
    });
}

setInterval(() => {
    secondsTracked++;
    const clock = document.getElementById('live-clock');
    if(clock) clock.innerText = new Date().toLocaleTimeString();

    const mins = Math.floor(secondsTracked / 60);
    const secs = secondsTracked % 60;
    const timer = document.getElementById('session-timer');
    if(timer) timer.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if(secondsTracked % 1800 === 0) { 
        points += 5;
        const pDisp = document.getElementById('user-points');
        if(pDisp) pDisp.innerText = points;
        let me = leaderboardData.find(u => u.name === "Ahmet_DEV");
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