document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cmd-input');
    if(input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runCommand();
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

    box.innerHTML += `<div><span style="color:#0f0">admin@secure:~$</span> ${input.value}</div>`;
    
    if(cmd === "help") {
        box.innerHTML += "<div>- <b>scan</b>: Güvenlik taraması yapar.<br>- <b>open vault</b>: Kasayı açar.<br>- <b>clear</b>: Ekranı temizler.</div>";
    } else if(cmd === "scan") {
        box.innerHTML += "<div style='color:cyan'>Analiz: AppBee altyapısı kullanılarak tüm açıklar kapatıldı!</div>";
    } else if(cmd === "open vault") {
        openWindow('files-win');
        box.innerHTML += "<div>[SUCCESS] Vault Files erişimi sağlandı.</div>";
    } else if(cmd === "clear") {
        box.innerHTML = "";
    } else {
        box.innerHTML += "<div style='color:#f44'>Komut anlaşılamadı. 'help' yazın.</div>";
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