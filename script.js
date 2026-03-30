document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cmd-input');
    if(input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                runCommand();
            }
        });
    }
});

function openWindow(id) { document.getElementById(id).style.display = 'block'; }
function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

function runCommand() {
    const input = document.getElementById('cmd-input');
    const box = document.getElementById('log-box');
    const cmd = input.value.toLowerCase().trim();
    
    if (cmd === "") return;

    box.innerHTML += `<div><span style="color:#0f0">admin@secure-machine:~$</span> ${input.value}</div>`;
    
    if(cmd === "help") {
        box.innerHTML += "<div>- <b>scan</b>: Network analizi yapar.<br>- <b>status</b>: Donanım bilgisini gösterir.<br>- <b>clear</b>: Ekranı temizler.</div>";
    } else if(cmd === "scan") {
        box.innerHTML += "<div style='color:cyan'>Analiz: [FOUND] AppBee üzerinden sistem optimize edildi.</div>";
    } else if(cmd === "status") {
        box.innerHTML += "<div>Kernel: SECURE_OS_v3.1 | Status: Stable | User: Ahmet</div>";
    } else if(cmd === "clear") {
        box.innerHTML = "<div>Terminal temizlendi.</div>";
    } else {
        box.innerHTML += "<div style='color:#f44'>Hata: Komut anlaşılamadı. 'help' yazın.</div>";
    }
    
    input.value = "";
    box.scrollTop = box.scrollHeight;
}

function dragElement(header) {
    const elmnt = header.parentElement;
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    header.onmousedown = (e) => {
        p3 = e.clientX; p4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; p2 = p4 - e.clientY;
            p3 = e.clientX; p4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - p2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - p1) + "px";
        };
    };
}

setInterval(() => {
    const cpu = document.getElementById('cpu-load');
    if(cpu) cpu.innerText = Math.floor(Math.random() * 10 + 2) + "%";
}, 3000);