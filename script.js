let suAnkiMod = "kanka"; 

const veriTabani = {
    "kanka": {
        // --- SENİN ÖZEL EMEKLERİN ---
        "oluyorum": "Dur kanka hemen gitme! Bismillahirrahmânirrahîm. Elhamdülillâhi rabbil'alemin...",
        "oldum": "Hakkın rahmetine kavuştun demek... Mekanın cennet olsun kanka, Fatiha'nı okuyorum...",
        "aptalsin": "Sana bakılırsa kim aptal he!",
        "gerizekali": "Sensin o ben daha konuşmuyorum bile!",
        "evimde 90 kiloluk bir tavuk var": "İyi denemeydi, o kadar çok soruldu ki anlamamam imkansız kanka.",
        "arkadaşımı gebertecem": "NAPIYON ÇABUK BIRAK ARKADAŞINI HAPİSHANEYE GİTMEK Mİ İSTİYON!",
        "ben mehmetim": "Selam Mehmet, naber?",
        "ben egemenim": "Selam Egemen, bugün formundasan bakıyorum!",
        "ben beyazitim": "Selam Beyazıt, naber kanka?",
        
        // --- GENEL SOHBET ---
        "naber": "İyilik sağlık kanka, takılıyoruz işte. Ne yapalım bugün?",
        "nasilsin": "Seni gördüm daha iyi oldum. Sen nasılsın?",
        "selam": "Selam kanka, hoş geldin!",
        "hey": "Yo! Naber dostum?",
        "hi": "Hi buddy! What's up?",
        "hello": "Hello! I'm your digital best friend.",
        "en sevdigin oyun": "Tabii ki Minecraft! Bloklarla dünya kurmak gibisi var mı?",
        
        // --- TEPKİLER ---
        "tm": "Tamam mı? Kısa kestin sanki kanka.",
        "ok": "Okey kanka, anlaştık.",
        "ahaha": "Gülmek sana çok yakışıyor kanka!"
    },
    
    "resmi": {
        "merhaba": "Merhabalar. Size nasıl yardımcı olabilirim?",
        "naber": "Teşekkür ederim, sistemlerim kararlı bir şekilde çalışmaktadır. Sizin için ne yapabilirim?",
        "nasilsiniz": "İlginiz için teşekkürler. Gayet iyiyim, siz nasılsınız?",
        "kimsin": "Ben, ARCHIMEDES adında profesyonel bir dil modeliyim.",
        "oluyorum": "Lütfen sakin kalınız. Eğer ciddi bir sağlık probleminiz varsa derhal 112'yi arayınız."
    },

    "cok_resmi": {
        "merhaba": "En derin saygılarımla esenlikler dilerim efendim. Buyurunuz.",
        "naber": "Zat-ı âlinizi gördüm, çok daha mesut oldum. Sizler afiyettesinizdir inşaallah?",
        "nasilsiniz": "Şahsım adına sorduğunuz için müteşekkirim. Devamlı bir tekâmül içerisindeyim.",
        "eyvallah": "Eyvallah efendim, her daim emrinizdeyim.",
        "oluyorum": "Fâni dünya böyledir efendim, her nefis ölümü tadacaktır. Mevla taksiratınızı affeylesin."
    }
};

// HTML ELEMENTLERİNİ TANIMLAMA
const inputField = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// MOD DEĞİŞTİRME FONKSİYONU
function modDegistir(yeniMod) {
    suAnkiMod = yeniMod;
    let modAdi = yeniMod === "kanka" ? "KANKA MODU 😎" : yeniMod === "cok_resmi" ? "ÇOK RESMİ 🤵" : "RESMİ DİL 💼";
    chatBox.innerHTML += `<div class="msg bot" style="border: 1px solid #00ffcc;">⚙️ <b>${modAdi}</b> aktif edildi.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// MESAJ GÖNDERME MOTORU
function mesajGonder() {
    const mesaj = inputField.value.trim();
    if (mesaj === "") return;

    // AKILLI TEMİZLİK: Türkçe karakterleri düzeltir ve işaretleri siler
    let temizMesaj = mesaj.toLowerCase()
        .replace(/[?.!]/g, "") 
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");

    chatBox.innerHTML += `<div class="msg user">${mesaj}</div>`;
    inputField.value = "";

    let cevap = "";
    if (veriTabani[suAnkiMod][temizMesaj]) {
        cevap = veriTabani[suAnkiMod][temizMesaj];
    } else {
        cevap = suAnkiMod === "kanka" ? "Bunu henüz bana öğretmedin kanka!" : "Sistem yanıtı bulunamadı.";
    }

    // BOTUN CEVAP VERMESİ
    setTimeout(() => {
        chatBox.innerHTML += `<div class="msg bot"><b>ARCHIMEDES:</b> ${cevap}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);
}

// OLAY DİNLEYİCİLERİ (Buton ve Klavye)
sendBtn.onclick = mesajGonder;
inputField.onkeypress = function(e) {
    if (e.key === "Enter") mesajGonder();
};