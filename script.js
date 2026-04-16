let suAnkiMod = "kanka"; 

const veriTabani = {
    "kanka": {
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
        "bana bildiğin küfürleri say": "maalesef google botları yüzünden bunu yapamam bro",
        "gerizekali": "sensin o, ben daha konuşmuyorum bile!"
        "beyinsiz": "doğru! herhangi bir beynim yok ama yine de ayaktayım sende bulunmayan bi organ olduğu için mi sordun?ben sende göremedim de!"
        "ben mal değilim sensin ": "boş yapma knk!"
        "sen boş yapma lan": "o zaman dolu yaparım!"// Diğer kanka cevaplarını buraya eklemeye devam edebilirsin...
    },
    "resmi": {
        "naber": "Nasılsınız? Size nasıl yardımcı olabilirim?",
        "nasilsin": "Teşekkür ederim, sistemlerim stabil çalışıyor.",
        "selam": "Merhabalar, hoş geldiniz.",
        "kimsin": "Ben ARCHIMEDES, yardımcı bir yapay zeka asistanıyım.",
        // Buraya resmi cevaplarını yaz...
        "kendimi kotu hissediyorum": "anladım,hangi yönden kötüsün? " 
    },
    "cok_resmi": {
        "naber": "İyilik ve esenlikler dilerim efendim.",
        "nasilsin": "Şahsım adına sorduğunuz için müteşekkirim, her şey yolunda.",
        "selam": "En içten saygılarımla, buyurunuz.",
        "kimsin": "ARCHIMEDES isminde, yüksek kapasiteli bir dil modeliyim.",
        // Buraya çok resmi cevaplarını yaz...
        "kendimi kotu hissediyorum": "anladım efendim,hangi yönden kötü hissediyorsanız çekinmeyin efendim ben yardım için varım "
    }
};

const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

function modDegistir(yeniMod) {
    suAnkiMod = yeniMod;
    chatBox.innerHTML += `<div class="msg bot">⚙️ Mod Değiştirildi: <b>${yeniMod.toUpperCase()}</b></div>`;
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
    else if (kucukMesaj.length > 6 && !/[aeıioöuü]/.test(kucukMesaj)) {
        cevap = suAnkiMod === "kanka" ? "Ne yazıyon kanka?" : "Anlaşılamayan veri girişi saptandı.";
    } 
    else {
        cevap = suAnkiMod === "kanka" ? "Bunu henüz bana öğretmedin!" : "Bu girdi için sistemimde bir karşılık bulunmamaktadır.";
    }

    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>ARCHIMEDES:</b> ${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
}

sendBtn.addEventListener("click", mesajGonder);
inputField.addEventListener("keypress", (e) => { if (e.key === "Enter") mesajGonder(); });