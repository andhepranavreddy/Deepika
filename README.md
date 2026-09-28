# 🎂 Deepika's Birthday Surprise Website 🎉❤️

A beautiful, highly interactive, modern birthday website built with love for my best friend **Deepika**, created by **Pranav**.

---

## ✨ Features

- **🎉 Fullscreen Hero Section**: Animated greeting with interactive CTA button, floating particle background, and subtle decorative sparkles.
- **🎵 Floating Music Player**: Toggle background music (`assets/birthday-song.mp3`) with fallback Web Audio API synthesizer chime so music plays on any browser.
- **💕 Real-Time Birthday Countdown Clock**: Glassmorphism live countdown timer calculating days, hours, minutes, and seconds until the special day!
- **📸 Animated Memories Polaroid Gallery**: 6 aesthetic memory cards with subtle tilt rotations, photo captions, and full-screen lightbox modal preview with smooth zoom.
- **💫 Friendship Journey Timeline**: Vertical timeline highlighting key milestones in your friendship with scroll reveal animations.
- **💌 Emotional Letter & Typewriter Animation**: Letter-by-letter typing animation presenting a heartfelt birthday message inside a glassmorphism envelope card.
- **🎁 Interactive 3D Gift Box**: Clickable 3D gift box that pops open with confetti explosions, balloon animations, and pop-up modal surprises!
- **💖 Compliment Generator**: Instant mood booster button generating random sweet compliments on demand.
- **🐣 Secret Easter Eggs**: Interactive heart icons and birthday cakes triggering fun hidden toast messages.
- **🥂 Replay The Magic**: One-click replay button scrolling to the top and re-launching celebration animations.

---

## 📁 Project Structure

```
KB/
│
├── index.html          # Main HTML structure with semantic elements
├── style.css           # Glassmorphism, animations, responsive CSS tokens
├── script.js           # Real-time countdown, confetti, sound, modals, typewriter
│
├── assets/
│   ├── birthday-song.mp3   # Background birthday music
│   ├── photo1.jpg          # Polaroid memory photo 1
│   ├── photo2.jpg          # Polaroid memory photo 2
│   ├── photo3.jpg          # Polaroid memory photo 3
│   ├── photo4.jpg          # Polaroid memory photo 4
│   ├── photo5.jpg          # Polaroid memory photo 5
│   └── photo6.jpg          # Polaroid memory photo 6
│
└── README.md           # Instructions & documentation
```

---

## ⚙️ How to Personalize

To change names, birthday date, message, or photos, open `script.js` and edit the `CONFIG` object at the very top:

```javascript
const CONFIG = {
    FRIEND_NAME: "Deepika",       // Best friend's name
    YOUR_NAME: "Pranav",           // Your name
    BIRTHDAY_DATE: "13/09",        // DD/MM format
    MESSAGE: `Your personalized birthday message here...`,
    PHOTO_CAPTIONS: [ ... ],
    COMPLIMENTS: [ ... ],
    SONG_PATH: "assets/birthday-song.mp3"
};
```

### 🖼️ Replacing Photos
Replace the files inside `assets/photo1.jpg` through `photo6.jpg` with your own personal photos with your best friend!

---

## 🚀 How to Run Locally

Simply open `index.html` in any web browser, or use a local dev server such as VS Code Live Server or python http.server:

```bash
# Optional: Run simple server in terminal
npx http-server KB/
```

Enjoy celebrating your best friend's special day! 🥂✨
