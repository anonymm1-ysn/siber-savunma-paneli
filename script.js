let suAnkiMod = "resmi"; 

const veriTabani = {
    // BURAYA SENİN O UZUN KANKA CEVAPLARINI YAPIŞTIR
    "kanka": {
        "naber": "İyilik sağlık kanka, takılıyoruz işte.",
        "aptalsin": "Sana bakılırsa kim aptal he!",
        "naber": "İyilik sağlık kanka, takılıyoruz işte.ne yapalım bugün?",
        "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
        "selam": "Selam dostum!",
        "kimsin": "Ben ARCHIMEDES, senin dijital cep kankanım.peki sen kimsin?",
        "aptalsin": "Sana bakılırsa kim aptal he!",
        "en iyi arkadasin kim": "Sensin tabii ki, başka kim olacak?",
        "kendimi kotu hissediyorum": "Unut gitsin başka şeyler hakkında konuşalım! Belki moralin yerine gelir.",
        "canim sikkin": "Nedenini anlatırsan yardımcı olabilirim. Belki de başına kötü bir şey gelmiştir.",
        "evimde 90 kiloluk bir tavuk var": "İyi denemeydi, artık o kadar çok soruldu ki anlamamam imkansız kanka",
        "arkadaşımı gebertecem": "NAPIYON ÇABUK BIRAK ARKADAŞINI HAPİSHANEYE GİTMEK Mİ İSTİYON!",
        "ben mehmetim": "Selam mehmet.",
        "gerizekali": "sensin o ben daha konuşmuyorum bile!"
        // ... senin listen ...
    },
    // RESMİ VE ÇOK RESMİ CEVAPLARINI DA DOLDURMALISIN
    "resmi": {
        "naber": "Nasılsınız? Size nasıl yardımcı olabilirim?",
        "nasilsin": "Teşekkür ederim, sistemlerim stabil çalışıyor.",
        "kendimi kotu hissediyorum": "Size nasıl destek olabilirim?",
        "naber": "Nasılsınız? Size nasıl yardımcı olabilirim?",
        "nasilsin": "Teşekkür ederim, sistemlerim stabil çalışıyor.",
        "selam": "Merhabalar, hoş geldiniz.",
        "kimsin": "Ben ARCHIMEDES, yardımcı bir yapay zeka asistanıyım.",
    },
    "cok_resmi": {
        "naber": "Esellamünaleyküm, ne yaparsınız?",
        "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
        "kendimi kotu hissediyorum": "Üzüntünüzü paylaşıyorum, efendim.",
        "naber": "İyilik ve esenlikler dilerim efendim.",
        "nasilsin": "Şahsım adına sorduğunuz için müteşekkirim, her şey yolunda.",
        "selam": "En içten saygılarımla, buyurunuz.",
        "kimsin": "ARCHIMEDES isminde, yüksek kapasiteli bir dil modeliyim.",
        // Buraya çok resmi cevaplarını yaz...
    }
};

const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

function modDegistir(yeniMod) {
    suAnkiMod = yeniMod;
    let modAdi = yeniMod === "kanka" ? "KANKA MODU 😎" : yeniMod === "cok_resmi" ? "ÇOK RESMİ 🤵" : "RESMİ DİL 💼";
    chatBox.innerHTML += `<div class="msg bot" style="border-color: #00ffcc;">⚙️ <b>${modAdi}</b> aktif edildi.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function mesajGonder() {
    const mesaj = inputField.value.trim();
    const kucukMesaj = mesaj.toLowerCase();

    if (mesaj === "") return;

    chatBox.innerHTML += `<div class="msg user">${mesaj}</div>`;
    inputField.value = "";

    let cevap = "";

    // Seçili moda göre cevap bulma
    if (veriTabani[suAnkiMod][kucukMesaj]) {
        cevap = veriTabani[suAnkiMod][kucukMesaj];
    } 
    // Saçma yazıları (hddlqdehwf) kontrol et
    else if (kucukMesaj.length > 6 && !/[aeıioöuü]/.test(kucukMesaj)) {
        cevap = suAnkiMod === "kanka" ? "Ne yazıyon kanka?" : "Anlaşılamayan veri girişi saptandı.";
    } 
    else {
        cevap = suAnkiMod === "kanka" ? "Bunu henüz bana öğretmedin kanka!" : "Bu girdi için sistemimde bir karşılık bulunmamaktadır.";
    }

    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>ARCHIMEDES:</b> ${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 450);
}

sendBtn.addEventListener("click", mesajGonder);
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") mesajGonder();
});