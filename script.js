const veriTabani = {
    "naber": "İyidir kanka, ARCHIMEDES her zaman hizmetinde!",
    "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
    "selam": "Selam dostum!",
    "kimsin": "Ben ARCHIMEDES, senin dijital cep kankanım.",
    "aptalsin": "Sana bakılırsa kim aptal he!",
    "en iyi arkadasin kim": "Sensin tabii ki, başka kim olacak?",
    "kendimi kotu hissediyorum": "Unut gitsin başka şeyler hakkında konuşalım! Belki moralin yerine gelir.",
    "canim sikkin": "Nedenini anlatırsan yardımcı olabilirim. Belki de başına kötü bir şey gelmiştir."
};

const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

function mesajGonder() {
    const mesaj = inputField.value.trim();
    const kucukMesaj = mesaj.toLowerCase();

    if (mesaj === "") return;

    // Kullanıcı mesajı
    chatBox.innerHTML += `<div class="msg user">${mesaj}</div>`;
    inputField.value = "";

    let cevap = "";

    // Cevap bulma
    if (veriTabani[kucukMesaj]) {
        cevap = veriTabani[kucukMesaj];
    } else if (kucukMesaj.length > 6 && !/[aeıioöuü]/.test(kucukMesaj)) {
        cevap = "Ne yazıyon kanka? Klavyede rastgele tuşlara basma!";
    } else {
        cevap = "Bunu henüz hafızama yüklemedin kanka. Bana bunu öğretmelisin!";
    }

    // Bot cevabı
    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot">${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
}

// TIKLAMA OLAYI
sendBtn.onclick = mesajGonder;

// ENTER TUŞU
inputField.onkeypress = function(e) {
    if (e.key === "Enter") {
        mesajGonder();
    }
};