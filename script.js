const logs = [
    "[INFO] GHOST-SHIELD v5.0 sistemi başlatılıyor...",
    "[INFO] Firewall katmanları yükleniyor: %100",
    "[WARN] Harici bağlantı tespit edildi: 182.20.10.4",
    "[INFO] Paket izleme başlatıldı (Mode: Stealth)",
    "[SUCCESS] SQL veri tabanı şifrelendi.",
    "[INFO] Bilişim Hocası sistemi izliyor...",
    "[ERROR] Hacker sızma girişimi engellendi!",
    "[INFO] Kernel protokolleri optimize ediliyor..."
];

function enterSystem() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    startTerminal();
}

function startTerminal() {
    let i = 0;
    const box = document.getElementById('log-box');
    setInterval(() => {
        if(i < logs.length) {
            box.innerHTML += `<div>${logs[i]}</div>`;
            box.scrollTop = box.scrollHeight;
            i++;
        }
    }, 1500);
}

function analyzePass() {
    const val = document.getElementById('passIn').value;
    const status = document.getElementById('pass-status');
    if(val.length < 5) { status.innerHTML = "DURUM: <span style='color:red'>ZAYIF</span>"; }
    else if(val.length < 10) { status.innerHTML = "DURUM: <span style='color:orange'>ORTA</span>"; }
    else { status.innerHTML = "DURUM: <span style='color:lime'>AŞILAMAZ!</span>"; }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("show");
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("show");
    evt.currentTarget.className += " active";
}