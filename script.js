function openWindow(id) { document.getElementById(id).style.display = 'block'; }
function closeWindow(id) { document.getElementById(id).style.display = 'none'; }

function runCommand(event) {
    if (event.key === "Enter") {
        const input = document.getElementById('cmd-input');
        const box = document.getElementById('log-box');
        const cmd = input.value.toLowerCase().trim();
        
        box.innerHTML += `<div><span style="color:#0f0">admin@secure-machine:~$</span> ${input.value}</div>`;
        
        if(cmd === "help") {
            box.innerHTML += "<div>- <b>scan</b>: Network analizi yapar.<br>- <b>status</b>: Donanım bilgisini gösterir.<br>- <b>whoami</b>: Yetki seviyesini gösterir.<br>- <b>clear</b>: Ekranı temizler.</div>";
        } else if(cmd === "scan") {
            box.innerHTML += "<div style='color:cyan'>Analiz: [FOUND] AppBee ProLab üzerinden veri akışı optimize edildi.</div>";
        } else if(cmd === "status") {
            box.innerHTML += "<div>Kernel: SECURE_OS_v3 | Node: Innova_Cloud | Status: Stable</div>";
        } else if(cmd === "clear") {
            box.innerHTML = "";
        } else {
            box.innerHTML += "<div style='color:#f44'>Hata: Bilinmeyen komut. 'help' yazın.</div>";
        }
        
        input.value = "";
        box.scrollTop = box.scrollHeight;
    }
}

// Pencere Sürükleme
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

// Dinamik CPU Simülasyonu
setInterval(() => {
    document.getElementById('cpu-load').innerText = Math.floor(Math.random() * 15 + 3) + "%";
}, 2000);