class FoxzyAI {
    constructor() {
        this.actor = document.getElementById('fox-actor');
        this.sprite = document.getElementById('fox-sprite');
        this.thought = document.getElementById('thought-cloud');
        
        this.stats = { hunger: 100, energy: 100, mood: 100 };
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.target = { x: this.pos.x, y: this.pos.y };
        this.state = 'IDLE'; // IDLE, WANDER, SEEK_FOOD, SLEEP, DRAG
        
        this.init();
    }

    init() {
        // Profesyonel açılış gecikmesi
        setTimeout(() => {
            document.getElementById('boot-loader').style.opacity = 0;
            setTimeout(() => document.getElementById('boot-loader').remove(), 500);
            this.updateLoop();
            this.logicLoop();
        }, 2200);

        this.setupEventListeners();
    }

    // Gerçek zamanlı pozisyon güncelleme (60 FPS mantığı)
    updateLoop() {
        const move = () => {
            if (this.state !== 'SLEEP' && this.state !== 'DRAG') {
                // Pürüzsüz takip fiziği (Lerp)
                this.pos.x += (this.target.x - this.pos.x) * 0.05;
                this.pos.y += (this.target.y - this.pos.y) * 0.05;

                this.actor.style.left = `${this.pos.x}px`;
                this.actor.style.top = `${this.pos.y}px`;

                // Yön kontrolü
                const dist = this.target.x - this.pos.x;
                if (Math.abs(dist) > 1) {
                    this.sprite.style.transform = dist > 0 ? 'scaleX(1)' : 'scaleX(-1)';
                }
            }
            requestAnimationFrame(move);
        };
        move();
    }

    // Karar Verme Mekanizması (AI)
    logicLoop() {
        setInterval(() => {
            if (this.state === 'DRAG') return;

            // İhtiyaç analizi
            if (this.stats.energy < 20) this.setState('SLEEP');
            else if (this.stats.hunger < 40) this.setState('WANDER');
            else if (this.state === 'IDLE' && Math.random() > 0.7) this.setState('WANDER');

            // İstatistikleri düşür
            this.stats.hunger = Math.max(0, this.stats.hunger - 1);
            this.stats.energy = Math.max(0, this.stats.energy - 0.5);
            this.updateUI();
        }, 3000);
    }

    setState(newState) {
        this.state = newState;
        console.log(`AI_STATE: ${newState}`);

        switch (newState) {
            case 'WANDER':
                this.target = {
                    x: Math.random() * (window.innerWidth - 200),
                    y: Math.random() * (window.innerHeight - 200)
                };
                this.sprite.src = 'fox_run.gif';
                this.showThought("Kelebek mi o? 🦋");
                setTimeout(() => this.setState('IDLE'), 4000);
                break;
            case 'IDLE':
                this.sprite.src = 'fox_idle.gif';
                break;
            case 'SLEEP':
                this.sprite.src = 'fox_sleep.jpg';
                this.showThought("Zzz... Enerji doluyor...");
                break;
        }
    }

    showThought(text) {
        this.thought.innerText = text;
        this.thought.style.opacity = 1;
        setTimeout(() => this.thought.style.opacity = 0, 2500);
    }

    updateUI() {
        document.getElementById('h-fill').style.width = `${this.stats.hunger}%`;
        document.getElementById('e-fill').style.width = `${this.stats.energy}%`;
    }

    spawnFood() {
        const bowl = document.getElementById('food-bowl');
        bowl.style.display = 'block';
        bowl.style.left = `${Math.random() * 80}vw`;
        bowl.style.top = `${Math.random() * 80}vh`;
        this.target = { x: parseFloat(bowl.style.left), y: parseFloat(bowl.style.top) };
        this.showThought("YEMEK! 🍖");
        
        setTimeout(() => {
            this.stats.hunger = 100;
            bowl.style.display = 'none';
            this.setState('IDLE');
        }, 5000);
    }

    setupEventListeners() {
        // Drag mantığı (Vivi Kedi gibi ama fizik destekli)
        this.actor.onmousedown = (e) => {
            this.state = 'DRAG';
            let shiftX = e.clientX - this.actor.getBoundingClientRect().left;
            let shiftY = e.clientY - this.actor.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                this.pos.x = pageX - shiftX;
                this.pos.y = pageY - shiftY;
                this.actor.style.left = this.pos.x + 'px';
                this.actor.style.top = this.pos.y + 'px';
            };

            const onMouseMove = (e) => moveAt(e.pageX, e.pageY);
            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                this.target = { x: this.pos.x, y: this.pos.y };
                this.setState('IDLE');
                document.onmouseup = null;
            };
        };
    }
}

const petManager = new FoxzyAI();