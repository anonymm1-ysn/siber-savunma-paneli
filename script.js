let currentUser = localStorage.getItem('vaultUser') || "";

document.addEventListener('DOMContentLoaded', () => {
    if (currentUser !== "") showPrepArea();
    setupTerminal();
    setupPaint();
});

function saveUser() {
    let name = document.getElementById('user-name-input').value.trim();
    if(name.length > 1) {
        currentUser = name;
        localStorage.setItem('vaultUser', currentUser);
        showPrepArea();
    }
}

function showPrepArea() {
    document.getElementById('login-screen').style.display = "none";
    document.getElementById('prep-area').style.display = "flex";
    document.getElementById('user-display').innerText = currentUser;
}

function bootVM() {
    document.getElementById('prep-area').style.display = "none";
    document.getElementById('vm-desktop').style.display = "flex";
    document.getElementById('term-tag').innerText = currentUser + "@vault:~$ ";
    openApp('win-readme'); // Açılışta Readme gelsin
}

function openApp(id) { document.getElementById(id).style.display = 'flex'; }
function closeApp(id) { document.getElementById(id).style.display = 'none'; }

function setupTerminal() {
    document.getElementById('cmd-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = e.target.value;
            const log = document.getElementById('log-box');
            log.innerHTML += `<div><span style="color:#0f0">${currentUser}@vault:~$</span> ${val}</div>`;
            if(val.toLowerCase().startsWith('system.out.println')) {
                const msg = val.match(/\(([^)]+)\)/)?.[1].replace(/['"]/g, '') || "Error";
                log.innerHTML += `<div style="color:#f89820">[Java]: ${msg}</div>`;
            }
            e.target.value = "";
            log.scrollTop = log.scrollHeight;
        }
    });
}

function setupPaint() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    let painting = false;
    canvas.onmousedown = () => painting = true;
    canvas.onmouseup = () => { painting = false; ctx.beginPath(); };
    canvas.onmousemove = (e) => {
        if (!painting) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    };
}

setInterval(() => {
    document.getElementById('live-time').innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);