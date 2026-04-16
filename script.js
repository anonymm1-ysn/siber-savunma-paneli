let suAnkiMod = "kanka"; 

const veriTabani = {
    "kanka": {
        // --- ÖZEL CEVAPLAR ---
        "oluyorum": "Dur kanka hemen gitme! Bismillahirrahmânirrahîm. Elhamdülillâhi rabbil'alemin...",
        "aptalsin": "Sana bakılırsa kim aptal he!",
        "malsin": "Kime diyorsun sen onu kanka? Ayıp oluyor ama!",
        "gerizekali": "Sensin o ben daha konuşmuyorum bile!",
        "evimde 90 kiloluk bir tavuk var": "İyi denemeydi, artık o kadar çok soruldu ki anlamamam imkansız kanka.",
        "arkadasimi gebertecem": "NAPIYON ÇABUK BIRAK ARKADAŞINI HAPİSHANEYE GİTMEK Mİ İSTİYON!",
        
        // --- GENEL SOHBET ---
        "naber": "İyilik sağlık kanka, takılıyoruz işte. Ne yapalım bugün?",
        "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
        "selam": "Selam kanka, hoş geldin!",
        "napiyon": "Seni bekliyordum, ARCHIMEDES her zaman hazır!",
        "en sevdigin oyun": "Tabii ki Minecraft! Bloklarla dünya kurmak gibisi var mı?",
        "hi": "Hi buddy! What's up?",
        "hello": "Hello! I am ARCHIMEDES, your best digital friend.",

        // --- TEPKİLER ---
        "tm": "Tamam mı? Kısa kestin sanki kanka.",
        "ok": "Okey kanka, anlaştık.",
        "ahaha": "Gülmek sana çok yakışıyor kanka!"
    },
    
    "resmi": {
        "merhaba": "Merhabalar. Size nasıl yardımcı olabilirim?",
        "nasilsiniz": "İlginiz için teşekkürler. Gayet iyiyim, siz nasılsınız?",
        "kimsin": "Ben, ARCHIMEDES adında profesyonel bir dil modeliyim.",
        "oluyorum": "Lütfen sakin kalınız. Ciddi bir durum varsa 112'yi arayınız."
    },

    "cok_resmi": {
        "merhaba": "En derin saygılarımla esenlikler dilerim efendim.",
        "naber": "Zat-ı âlinizi gördüm, çok daha mesut oldum. Afiyettesinizdir inşaallah?",
        "eyvallah": "Eyvallah efendim, her daim emrinizdeyim."
    }
};

const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// HARF HATALARINI ANLAMA ALGORİTMASI (Bulanık Mantık)
function benzerlikBul(mesaj, mod) {
    const anahtarlar = Object.keys(veriTabani[mod]);
    
    for (let anahtar of anahtarlar) {
        // 1. Tam eşleşme varsa direkt dön
        if (anahtar === mesaj) return veriTabani[mod][anahtar];

        // 2. Harf sırası karışmış mı kontrol et (Harfleri sıralayıp karşılaştırır)
        let siraliMesaj = mesaj.split('').sort().join('');
        let siraliAnahtar = anahtar.split('').sort().join('');
        
        if (siraliMesaj === siraliAnahtar) {
            return veriTabani[mod][anahtar];
        }
    }
    return null;
}

function modDegistir(yeniMod) {
    suAnkiMod = yeniMod;
    let modAdi = yeniMod === "kanka" ? "KANKA MODU 😎" : yeniMod === "cok_resmi" ? "ÇOK RESMİ 🤵" : "RESMİ DİL 💼";
    chatBox.innerHTML += `<div class="msg bot" style="border: 1px solid #00ffcc;">⚙️ <b>${modAdi}</b> aktif edildi.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function mesajGonder() {
    const mesaj = inputField.value.trim();
    if (mesaj === "") return;

    // KÜÇÜK HARF VE TÜRKÇE KARAKTER DÜZELTME
    let temizMesaj = mesaj.toLowerCase()
        .replace(/[?.!]/g, "") 
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");

    chatBox.innerHTML += `<div class="msg user">${mesaj}</div>`;
    inputField.value = "";

    // CEVAP BULMA SÜRECİ
    let cevap = benzerlikBul(temizMesaj, suAnkiMod);

    if (!cevap) {
        cevap = suAnkiMod === "kanka" ? "Bunu henüz bana öğretmedin kanka! Kodlara gir de öğret bana." : "Sistem yanıtı bulunamadı.";
    }

    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>ARCHIMEDES:</b> ${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
}

// OLAY DİNLEYİCİLERİ
sendBtn.onclick = mesajGonder;
inputField.onkeypress = function(e) { if (e.key === "Enter") mesajGonder(); };