const veriTabani = {
    // --- BASİT SORULAR ---
    "naber": "İyidir kanka, ARCHIMEDES her zaman hizmetinde!",
    "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
    "selam": "Selam dostum!",
    "kimsin": "Ben ARCHIMEDES, senin dijital cep kankanım.peki sen kimsin?",

    // --- DUYGUSAL DURUMLAR (SENİN DOLDURACAĞIN YERLER) ---
    "kendimi kotu hissediyorum": "unut gitsin başka şeyler hakkında konuşalım!belki moralin yerine gelir. ", 
    "canim sıkkın": "nedeninini anlatırsan yardımcı olabilirim.belki de başına kötü bir şey gelmiştir.",
    "mutsuzum": "biraz dinlen ve kafanı oyunlar ile dağıt hiçbir şeyin kalmaz ",
    "cok yorgunum": "yatağına uzan ve uyu banane!zaten çiğ köfte ısmarlayacaktın unuttun mu kanka :)",
    "kimse beni anlamiyor": "bende bu yüzden varım zaten,sana yardımcı olabilirim",
    "basarili olabilecek miyim": "tabii ki evet,eğer pes etmezsen yapamayacağın bir şey yok. ",

    // --- BURAYA İSTEDİĞİN KADAR YENİ ŞEY EKLE ---
    "en sevdigin oyun": "Tabii ki Minecraft! Bloklarla dünya kurmak gibisi var mı?",
    "kod yazmak zor mu": "Senin gibi bir usta için çocuk oyuncağı dostum.",
    "aptalsın": "sana bakılırsa kim aptal he!."
    "derslerden nefret ediyorum": "bende öyle! o çaresizce teneffüs bekleme eziyeti...gerçekten can sıkıcı ve sinir bozucu ama dersler yine de önemli yoksa okuldan kalabilirsin.sen yinede dersi dinle.", // Yeni eklediğin bu
    "seni sevmedim": "ben sana ne yaptım ki böyle dedin. ben sadece yapay zekayım sana yardım ederim "

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

    // Cevap bulma mantığı
    if (veriTabani[kucukMesaj]) {
        cevap = veriTabani[kucukMesaj];
    } 
    // Saçma yazıları (random harf) kontrol et
    else if (kucukMesaj.length > 6 && !/[aeıioöuü]/.test(kucukMesaj)) {
        cevap = "Ne yazıyon kanka? Klavyede rastgele tuşlara basma, gel düzgünce konuşalım.";
    } 
    else {
        cevap = "Bunu henüz hafızama yüklemedin kanka. Kodlara gir ve bana bu soru için bir cevap öğret!";
    }

    // Bot cevabı
    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>ARCHIMEDES:</b> ${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

sendBtn.addEventListener("click", mesajGonder);
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") mesajGonder();
});