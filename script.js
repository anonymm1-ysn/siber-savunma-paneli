class FoxzyAI {
    constructor() {
        this.foxy = document.getElementById('foxy');
        this.img = document.getElementById('foxy-img');
        this.thought = document.getElementById('thought');
        this.hud = document.getElementById('hud');
        
        this.stats = { hunger: 100, energy: 100 };
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.target = { x: this.pos.x, y: this.pos.y };
        this.state = 'IDLE'; // IDLE, RUNNING, SLEEPING, DRAGGING
        
        // PROFESYONEL VE GÜVENİLİR TİLKİ LİNKLERİ (GIPHY)
        this.GIFS = {
            run: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXByeXJueXByeXJueXByeXJueXByeXJueXByeXJueXByJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCBmcm9tX2dpZmZ5JmN0PWc/3o7TKSjRrfIPjeiVyM/giphy.gif",
            idle: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmNudTFqcXUwdXp5bmZ1bmx0eWltYXU5eXoxbmV3YnhueGt6eGZlbXImZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/Ym7YvPVA9hH56/giphy.gif",
            sleep: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVpazZpZzh6czY1Z3FmaXN4YnFobG1reGd1eHgyaGxpa2Q1bmJ4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VvXg0VkS6A2I/giphy.gif"
        };

        this.init();
    }

    init() {
        this.foxy.style.left = `${this.pos.x}px`;
        this.foxy.style.top = `${this.pos.y}px`;
        this.img.src = this.GIFS.idle; // Başlangıç resmi

        this.startBooting();
        this.setupDragging();
    }

    // 1. Matrix Yükleme Sistemi (Profesyonel Açılış)
    startBooting() {
        let loadPercent = 0;
        const fillBar = document.getElementById('load-fill');
        
        const boot = setInterval(() => {
            loadPercent += Math.random() * 10;
            if (loadPercent >= 100) {
                loadPercent = 100;
                clearInterval(boot);
                this.finalizeBoot();
            }
            fillBar.style.width = `${loadPercent}%`;
        }, 100);
    }

    finalizeBoot() {
        document.getElementById('loader').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('loader').remove();
            this.hud.style.display = "block"; // HUD'ı göster
            this.startAIEngine();
            this.startPhysicsEngine();
            this.showThought("Sistem Aktif! Merhaba Ahmet! 🦊");
        }, 800);
    }

    // 2. Fizik Motoru (Yumuşak Takip)
    startPhysicsEngine() {
        const move = () => {
            if (this.state !== 'SLEEPING' && this.state !== 'DRAGGING') {
                // Hedefe yumuşak takip (Lerp)
                this.pos.x += (this.target.x - this.pos.x) * 0.04;
                this.pos.y += (this.target.y - this.pos.y) * 0.04;

                this.foxy.style.left = `${this.pos.x}px`;
                this.foxy.style.top = `${this.pos.y}px`;

                // Yön Kontrolü
                const diff = this.target.x - this.pos.x;
                if (Math.abs(diff) > 2) {
                    this.foxy.style.transform = `scaleX(${diff > 0 ? 1 : -1})`;
                }
            }
            requestAnimationFrame(move);
        };
        move();
    }

    // 3. AI Karar Mekanizması (Profesyonel Mantık)
    startAIEngine() {
        setInterval(() => {
            if (this.state === 'DRAGGING' || this.state === 'SLEEPING') return;

            const decision = Math.random();

            if (this.stats.hunger < 30) {
                this.showThought("Karnım gurulduyor... 🍖");
                this.setState('IDLE');
            } else if (decision > 0.6) {
                // Rastgele Koş
                this.setState('RUNNING');
                this.target = {
                    x: Math.random() * (window.innerWidth - 200),
                    y: Math.random() * (window.innerHeight - 200)
                };
            } else {
                // Dur ve Bekle
                this.setState('IDLE');
            }

            // İstatistikleri Gerçekçi Düşür
            this.stats.hunger = Math.max(0, this.stats.hunger - 2);
            this.stats.energy = Math.max(0, this.stats.energy - 1);
            
            if (this.stats.energy <= 0) this.setState('SLEEPING');
            
            this.updateHUD();
        }, 4000); // 4 saniyede bir karar ver
    }

    setState(newState) {
        this.state = newState;
        console.log(`FOX_STATE: ${newState}`);
        
        switch (newState) {
            case 'IDLE':
                this.img.src = this.GIFS.idle;
                break;
            case 'RUNNING':
                this.img.src = this.GIFS.run;
                break;
            case 'SLEEPING':
                this.img.src = this.GIFS.sleep;
                this.showThought("Çok yoruldum... Enerji doluyor... Zzz 💤");
                break;
        }
    }

    // 4. Pet Sistemi ve Etkileşim
    showThought(text) {
        this.thought.innerText = text;
        this.thought.style.opacity = "1";
        setTimeout(() => {
            if (this.state !== 'DRAGGING' && this.state !== 'SLEEPING') this.thought.style.opacity = "0";
        }, 3000);
    }

    updateHUD() {
        document.getElementById('hunger-bar').style.width = `${this.stats.hunger}%`;
        document.getElementById('energy-bar').style.width = `${this.stats.energy}%`;
    }

    feedFoxy() {
        if (this.state === 'SLEEPING') {
            this.stats.energy = 50;
            this.setState('IDLE');
        }
        this.stats.hunger = 100;
        this.stats.energy = Math.min(100, this.stats.energy + 20);
        this.showThought("Nefis! Teşekkürler Ahmet! 🍖");
        this.updateHUD();
    }

    // 5. Drag Mantığı (Vivi Kedi Modu)
    setupDragging() {
        this.foxy.onmousedown = (e) => {
            this.foxy.style.transition = "none"; // Taşırken gecikmeyi kapat
            this.setState('IDLE'); // Taşırken idle resmine geç
            this.state = 'DRAGGING';
            
            let shiftX = e.clientX - this.foxy.offsetLeft;
            let shiftY = e.clientY - this.foxy.offsetTop;

            document.onmousemove = (moveE) => {
                this.pos.x = moveE.pageX - shiftX;
                this.pos.y = moveE.pageY - shiftY;
                this.foxy.style.left = `${this.pos.x}px`;
                this.foxy.style.top = `${this.pos.y}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                this.foxy.style.transition = "transform 0.2s ease-out";
                this.state = 'IDLE';
                this.target = { x: this.pos.x, y: this.pos.y };
                this.showThought("Hey, beni yakaladın! ✋");
                document.onmouseup = null;
            };
        };
    }
}

// Simülasyonu Başlat
const petFoxy = new FoxzyAI();