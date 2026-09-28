/* ==========================================================================
   HAPPY BIRTHDAY SURPRISE WEBSITE - JAVASCRIPT LOGIC
   ========================================================================== */

/* --------------------------------------------------------------------------
   EASY PERSONALIZATION CONFIGURATION
   Change any values below to customize the website!
   -------------------------------------------------------------------------- */
const CONFIG = {
    // Basic Details
    FRIEND_NAME: "Deepika",
    YOUR_NAME: "Pranav",
    BIRTHDAY_DATE: "13/09", // DD/MM format (e.g., 13th September)

    // Main Emotional Birthday Message (Supports \n for new lines)
    MESSAGE: `Happy Birthday to one of the most important people in my life. ❤️

Thank you for all the laughs, the crazy conversations, the unforgettable memories, and for simply being there.

I hope this year brings you happiness, success, peace, and everything you've been wishing for.

Keep smiling.
Never forget how special you are. ✨
Your alway special for someone😏

Happy Birthday! 🎂❤️`,

    // Photo Gallery Captions
    PHOTO_CAPTIONS: [
        "That crazy day 😂",
        "Cutie ❤️",
        "One of my favorite memories from that day😂",
        "Shokuladi NO.1✨"
    ],

    // Compliment Generator Phrases
    COMPLIMENTS: [
        "You're genuinely one of a kind. ✨",
        "You're stronger than you realize. 💪❤️",
        "You're someone's favorite person. 💕"
    ],

    // Path to background music file
    SONG_PATH: "assets/birthday-song.mp3"
};

/* --------------------------------------------------------------------------
   GLOBAL STATE & INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Personalize HTML content dynamically
    applyPersonalization();

    // Initialize Systems
    initBackgroundCanvas();
    initMusicPlayer();
    initCountdown();
    initScrollReveal();
    initNavigation();
    initGalleryModal();
    initTypewriterMessage();
    initGiftBoxSurprise();
    initComplimentGenerator();
    initEasterEggs();
    initReplayMagic();
});

/* --------------------------------------------------------------------------
   1. APPLY PERSONALIZATION DATA TO DOM
   -------------------------------------------------------------------------- */
function applyPersonalization() {
    const friendNameElements = document.querySelectorAll("#friend-name-display, #footer-friend-name");
    friendNameElements.forEach(el => el.textContent = CONFIG.FRIEND_NAME);

    const yourNameElements = document.querySelectorAll("#sender-name-display, #footer-your-name");
    yourNameElements.forEach(el => el.textContent = CONFIG.YOUR_NAME + " ❤️");

    // Update document title
    document.title = `Happy Birthday ${CONFIG.FRIEND_NAME}! 🎉❤️ | A Special Surprise`;
}

/* --------------------------------------------------------------------------
   2. MUSIC PLAYER SYSTEM (AUDIO + SYNTH FALLBACK)
   -------------------------------------------------------------------------- */
let isPlayingMusic = false;
let audioContext = null;

function initMusicPlayer() {
    const audio = document.getElementById("birthday-audio");
    const musicBtn = document.getElementById("music-toggle");

    if (CONFIG.SONG_PATH) {
        audio.src = CONFIG.SONG_PATH;
    }

    musicBtn.addEventListener("click", () => {
        toggleMusic();
    });
}

function toggleMusic() {
    const audio = document.getElementById("birthday-audio");
    const musicBtn = document.getElementById("music-toggle");
    const musicIcon = musicBtn.querySelector(".music-icon");

    if (!isPlayingMusic) {
        // Try playing standard audio asset first
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlayingMusic = true;
                musicBtn.classList.add("playing");
                musicIcon.textContent = "🎵";
            }).catch(err => {
                console.log("Audio file playback fallback to Web Audio Synth", err);
                playSynthMelody();
                isPlayingMusic = true;
                musicBtn.classList.add("playing");
                musicIcon.textContent = "🎵";
            });
        }
    } else {
        audio.pause();
        if (audioContext) audioContext.suspend();
        isPlayingMusic = false;
        musicBtn.classList.remove("playing");
        musicIcon.textContent = "🔇";
    }
}

// Web Audio API Synthesizer Fallback (Happy Birthday Tune)
function playSynthMelody() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContext) audioContext = new AudioContext();
        if (audioContext.state === "suspended") audioContext.resume();

        const notes = [
            { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 1.2 },
            { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.2 },
            { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.2 }, { f: 523.25, d: 0.6 }, { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 0.6 }, { f: 293.66, d: 1.0 }
        ];

        let now = audioContext.currentTime;
        notes.forEach((note) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = "sine";
            osc.frequency.value = note.f;

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start(now);
            osc.stop(now + note.d);

            now += note.d + 0.05;
        });
    } catch (e) {
        console.log("Synth error:", e);
    }
}

/* --------------------------------------------------------------------------
   3. CONFETTI & BALLOON LAUNCHER
   -------------------------------------------------------------------------- */
function launchConfetti(options = {}) {
    if (typeof confetti === "function") {
        confetti({
            particleCount: options.particleCount || 100,
            spread: options.spread || 70,
            origin: options.origin || { y: 0.6 },
            colors: ['#ff65a3', '#a855f7', '#60a5fa', '#fbbf24', '#ffffff']
        });
    } else {
        // Fallback custom confetti launcher
        createFallbackConfetti();
    }
}

function launchCelebrationExplosion() {
    launchConfetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    setTimeout(() => launchConfetti({ particleCount: 100, spread: 80, origin: { y: 0.3 } }), 300);
    setTimeout(() => launchConfetti({ particleCount: 120, spread: 120, origin: { y: 0.7 } }), 600);
    launchFloatingBalloons();
}

function launchFloatingBalloons() {
    const balloonContainer = document.createElement("div");
    balloonContainer.style.position = "fixed";
    balloonContainer.style.top = "0";
    balloonContainer.style.left = "0";
    balloonContainer.style.width = "100vw";
    balloonContainer.style.height = "100vh";
    balloonContainer.style.pointerEvents = "none";
    balloonContainer.style.zIndex = "999";
    document.body.appendChild(balloonContainer);

    const emojis = ["🎈", "🎈", "💖", "🎂", "✨", "🥳", "🌟"];
    for (let i = 0; i < 25; i++) {
        const balloon = document.createElement("div");
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        balloon.style.position = "absolute";
        balloon.style.bottom = "-50px";
        balloon.style.left = Math.random() * 95 + "vw";
        balloon.style.fontSize = (Math.random() * 2 + 2) + "rem";
        balloon.style.transition = `transform ${Math.random() * 3 + 4}s linear, opacity 1s ease`;
        balloonContainer.appendChild(balloon);

        setTimeout(() => {
            balloon.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
        }, 50);

        setTimeout(() => balloon.remove(), 7000);
    }

    setTimeout(() => balloonContainer.remove(), 7500);
}

function createFallbackConfetti() {
    for (let i = 0; i < 50; i++) {
        const p = document.createElement("div");
        p.style.position = "fixed";
        p.style.top = "50vh";
        p.style.left = "50vw";
        p.style.width = "10px";
        p.style.height = "10px";
        p.style.backgroundColor = ["#ff65a3", "#a855f7", "#60a5fa", "#fbbf24"][Math.floor(Math.random() * 4)];
        p.style.borderRadius = "50%";
        p.style.zIndex = "9999";
        p.style.pointerEvents = "none";
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 300 + 100;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        p.animate([
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${vx}px, ${vy + 200}px) scale(0.2)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)"
        }).onfinish = () => p.remove();
    }
}

/* --------------------------------------------------------------------------
   4. BACKGROUND CANVAS PARTICLES SYSTEM
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 0.8 + 0.2,
            speedX: (Math.random() - 0.5) * 0.5,
            color: ["rgba(255, 101, 163, ", "rgba(168, 85, 247, ", "rgba(96, 165, 250, ", "rgba(251, 191, 36, "][Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.7 + 0.2,
            pulse: Math.random() * 0.02 + 0.01
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
            p.y -= p.speedY;
            p.x += p.speedX;
            p.opacity += Math.sin(Date.now() * p.pulse) * 0.005;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.max(0.1, Math.min(0.9, p.opacity)) + ")";
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

/* --------------------------------------------------------------------------
   5. REAL-TIME BIRTHDAY COUNTDOWN SYSTEM
   -------------------------------------------------------------------------- */
function initCountdown() {
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");
    const bannerEl = document.getElementById("countdown-banner");

    // Parse Birthday Date (DD/MM)
    const parts = CONFIG.BIRTHDAY_DATE.split("/");
    const bDay = parseInt(parts[0], 10) || 1;
    const bMonth = (parseInt(parts[1], 10) || 1) - 1; // Month index (0-11)

    function updateTimer() {
        const now = new Date();
        let targetYear = now.getFullYear();

        let targetDate = new Date(targetYear, bMonth, bDay, 0, 0, 0);

        // If birthday has passed this year, set for next year
        if (now > targetDate && (now.getDate() !== bDay || now.getMonth() !== bMonth)) {
            targetDate.setFullYear(targetYear + 1);
        }

        const diff = targetDate - now;

        // Check if today IS the birthday
        if (now.getDate() === bDay && now.getMonth() === bMonth) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            bannerEl.style.display = "block";
            bannerEl.textContent = "🎉 IT'S YOUR SPECIAL DAY! HAPPY BIRTHDAY! 🎂🎉❤️";
            return;
        }

        if (diff <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            bannerEl.style.display = "block";
            bannerEl.textContent = "🎉 IT'S YOUR DAY! 🎂🎉❤️";
            launchCelebrationExplosion();
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        daysEl.textContent = d < 10 ? "0" + d : d;
        hoursEl.textContent = h < 10 ? "0" + h : h;
        minutesEl.textContent = m < 10 ? "0" + m : m;
        secondsEl.textContent = s < 10 ? "0" + s : s;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. NAVIGATION & CTA BUTTON CONTROLS
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("nav-links");
    const startCta = document.getElementById("start-surprise-btn");

    // Mobile Hamburger Toggle
    mobileBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // Main CTA "Open Your Surprise"
    startCta.addEventListener("click", () => {
        launchCelebrationExplosion();
        toggleMusic(); // Play song on first interaction
        document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
    });
}

/* --------------------------------------------------------------------------
   8. PHOTO GALLERY LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGalleryModal() {
    const cards = document.querySelectorAll(".polaroid-card");
    const modal = document.getElementById("photo-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption-text");
    const closeBtn = document.getElementById("modal-photo-close");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const photoSrc = card.getAttribute("data-photo");
            const caption = card.getAttribute("data-caption");

            modalImg.src = photoSrc;
            modalCaption.textContent = caption;
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

/* --------------------------------------------------------------------------
   9. TYPEWRITER EMOTIONAL MESSAGE
   -------------------------------------------------------------------------- */
function initTypewriterMessage() {
    const messageContainer = document.getElementById("message");
    const typewriterEl = document.getElementById("typewriter-text");
    let hasStarted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                startTypewriter(CONFIG.MESSAGE, typewriterEl);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(messageContainer);
}

function startTypewriter(text, element) {
    element.textContent = "";
    let i = 0;
    const speed = 35; // Typing speed in ms

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE GIFT BOX & BONUS MODALS
   -------------------------------------------------------------------------- */
function initGiftBoxSurprise() {
    const giftBox = document.getElementById("gift-box");
    const surpriseModal = document.getElementById("surprise-modal");
    const surpriseClose = document.getElementById("modal-surprise-close");
    const bonusBtn = document.getElementById("bonus-surprise-btn");
    const bonusModal = document.getElementById("bonus-modal");
    const bonusClose = document.getElementById("modal-bonus-close");
    const bonusOk = document.getElementById("modal-bonus-ok");

    giftBox.addEventListener("click", () => {
        giftBox.classList.add("open");
        launchCelebrationExplosion();

        setTimeout(() => {
            surpriseModal.classList.add("active");
            surpriseModal.setAttribute("aria-hidden", "false");
        }, 600);
    });

    const closeSurprise = () => {
        surpriseModal.classList.remove("active");
        surpriseModal.setAttribute("aria-hidden", "true");
        giftBox.classList.remove("open");
    };

    surpriseClose.addEventListener("click", closeSurprise);

    // Open Bonus Modal
    bonusBtn.addEventListener("click", () => {
        closeSurprise();
        setTimeout(() => {
            bonusModal.classList.add("active");
            bonusModal.setAttribute("aria-hidden", "false");
            launchConfetti({ particleCount: 80 });
        }, 300);
    });

    const closeBonus = () => {
        bonusModal.classList.remove("active");
        bonusModal.setAttribute("aria-hidden", "true");
    };

    bonusClose.addEventListener("click", closeBonus);
    bonusOk.addEventListener("click", closeBonus);
}

/* --------------------------------------------------------------------------
   11. COMPLIMENT GENERATOR
   -------------------------------------------------------------------------- */
function initComplimentGenerator() {
    const btn = document.getElementById("generate-compliment-btn");
    const textEl = document.getElementById("compliment-text");
    let lastIndex = -1;

    btn.addEventListener("click", () => {
        textEl.classList.add("animating");

        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * CONFIG.COMPLIMENTS.length);
            } while (randomIndex === lastIndex && CONFIG.COMPLIMENTS.length > 1);

            lastIndex = randomIndex;
            textEl.textContent = CONFIG.COMPLIMENTS[randomIndex];
            textEl.classList.remove("animating");
            launchConfetti({ particleCount: 30, spread: 50 });
        }, 200);
    });
}

/* --------------------------------------------------------------------------
   12. EASTER EGGS
   -------------------------------------------------------------------------- */
function initEasterEggs() {
    const easterHeart = document.getElementById("easter-heart");
    const secretCake = document.getElementById("secret-cake");
    const heroCake = document.getElementById("hero-cake");
    let heartClicks = 0;

    easterHeart.addEventListener("click", () => {
        heartClicks++;
        if (heartClicks >= 5) {
            showToast("❤️ Love Overload!", "Okay okay... I know you love this website 😂❤️ Thank you for being the best friend ever!");
            heartClicks = 0;
            launchCelebrationExplosion();
        } else {
            launchConfetti({ particleCount: 20, spread: 40 });
        }
    });

    const triggerCakeSurprise = () => {
        showToast("🎂 Secret Cake Found!", "🎂 You found the secret cake! 🎉 Here's a virtual slice of extra happiness for your day!");
        launchCelebrationExplosion();
    };

    secretCake.addEventListener("click", triggerCakeSurprise);
    heroCake.addEventListener("click", triggerCakeSurprise);
}

function showToast(title, message) {
    const modal = document.getElementById("toast-modal");
    const titleEl = document.getElementById("toast-title");
    const msgEl = document.getElementById("toast-message");
    const closeBtn = document.getElementById("toast-close");

    titleEl.textContent = title;
    msgEl.textContent = message;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    const closeToast = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    };

    closeBtn.addEventListener("click", closeToast);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeToast();
    });
}

/* --------------------------------------------------------------------------
   13. REPLAY THE MAGIC BUTTON
   -------------------------------------------------------------------------- */
function initReplayMagic() {
    const replayBtn = document.getElementById("replay-btn");

    replayBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        launchCelebrationExplosion();

        // Reset gift box
        const giftBox = document.getElementById("gift-box");
        if (giftBox) giftBox.classList.remove("open");

        // Re-type message
        const typewriterEl = document.getElementById("typewriter-text");
        if (typewriterEl) startTypewriter(CONFIG.MESSAGE, typewriterEl);
    });
}
