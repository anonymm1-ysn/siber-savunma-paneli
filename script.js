const veriTabani = {
    // BASİT SORULAR VE CEVAPLARIN
    "naber": "İyidir kanka senden naber? ", 
    "nasilsin": "çok iyiyim!, ARCHIMEDES her zaman hazır! Sen nasılsın?",
    "selam": "naber dostum, hoş geldin.",
    "merhaba": "Merhaba! Bugün neler yapıyoruz?",

    // KENDİMİ KÖTÜ HİSSEDİYORUM VB. İÇİN SENİN YAZACAĞIN YER
    "kendimi kötü hissediyorum": " ", // <-- BURAYA SENİN CEVABINI YAZ
    "canim sıkkın": " ",              // <-- BURAYA SENİN CEVABINI YAZ
    "mutsuzum": " "                   // <-- BURAYA SENİN CEVABINI YAZ
};

function sohbetEt() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const hamSoru = inputField.value.trim();
    const soru = hamSoru.toLowerCase();

    if (soru === "") return;

    // Mesajını ekrana ekle
    chatBox.innerHTML += `<div class="msg user">${hamSoru}</div>`;

    let cevap = "";

    // 1. ADIM: Veritabanında tam eşleşme var mı?
    if (veriTabani[soru]) {
        cevap = veriTabani[soru];
    } 
    // 2. ADIM: Eğer saçma sapan bir şey yazdıysa (Örn: hddlqdehwf)
    // Eğer kelime 7 harften uzunsa ve içinde sesli harf yoksa saçma kabul edelim
    else if (soru.length > 6 && !/[aeıioöuü]/.test(soru)) {
        cevap = "Ne yazıyon kanka, klavyen mi bozuldu? Doğru düzgün bir şey yaz.";
    }
    // 3. ADIM: Bilmediği bir şey sorulursa
    else {
        cevap = "Bunu henüz öğrenemedim, ARCHIMEDES'i kodlayan kişi  bunu bana öğretmeli!";
    }

    // Botun cevabı (ARCHIMEDES konuşuyor)
    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot">${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    inputField.value = "";
}

// Enter tuşuna basınca gönderme özelliği
function handleEnter(event) {
    if (event.key === "Enter") {
        sohbetEt();
    }
}