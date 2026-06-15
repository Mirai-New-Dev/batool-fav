/* ==========================================================
   AURA PLAYER — app.js
   ──────────────────────────────────────────────────────────
   Edit the TRACKS array below to add your music.
   • src  → direct audio URL (Dropbox, etc.) or local path
   • art  → image URL (https://…) OR local path (assets/…)
   ========================================================== */

const TRACKS = [
  {
    id: 0,
    title: 'первый поцелуй',
    artist: 'Rauf & Faik',
    art: 'https://i.ytimg.com/vi/xsD5SauGPM8/maxresdefault.jpg',            // ← image URL or local path
    src: 'https://dl.dropboxusercontent.com/scl/fi/lakcvfkenb2jmt3uq34x5/1_3-Rauf-Faik-320.mp3?rlkey=z7yuo4nv4qi2z2fwvlhz1kv5p&st=jb8sf2g5&dl=0',
    duration: '04:27'
  },
  {
    id: 1,
    title: 'menja plenila',
    artist: 'JONY',
    art: 'https://i.scdn.co/image/ab6761610000e5ebfaca175ff553179f6b3bed6a',        // ← image URL or local path
    src: 'https://dl.dropboxusercontent.com/scl/fi/hvsulp3k6ppq2xeuj6gy2/1_1-Ty-menja-plenila-JONY-320.mp3?rlkey=ktv41eqkbvmgk6w6ic2chp96l&st=xgeofyww&dl=0',                              // ← paste your audio URL here
    duration: '03:12'
  },
  {
    id: 2,
    title: 'Love Your Voice',
    artist: 'JONY',
    art: 'https://i.scdn.co/image/ab6761610000e5ebfaca175ff553179f6b3bed6a',            // ← image URL or local path
    src: 'https://dl.dropboxusercontent.com/scl/fi/twmdbwc2k4zv0v3l6sjwn/Love-Your-Voice-JONY.mp3?rlkey=xr5ubpeg7w4sbra8hb0o7lot9&st=9onf0emr&dl=0',                              // ← paste your audio URL here
    duration: '02:30'
  },
  {
    id: 3,
    title: 'Навсегда',
    artist: 'Rauf & Faik',
    art: 'https://i.ytimg.com/vi/xsD5SauGPM8/maxresdefault.jpg',           // ← image URL or local path
    src: 'https://dl.dropboxusercontent.com/scl/fi/8ddxaxl60ske9r34hasjz/1_8-Rauf-Faik-320.mp3?rlkey=nlfr7ftawcdqeblwzxo4vafu1&st=gmjskqvl&dl=0',                              // ← paste your audio URL here
    duration: '03:49'
  }
];

/* ─────────────────────────────────────────────────────────
   BUILD CARDS DYNAMICALLY from TRACKS array
   Each card is a mini-chip; controls are hidden inside
   .player-expand and only animate open when card is active.
   ───────────────────────────────────────────────────────── */
const floatClasses = ['float-a', 'float-b', 'float-c', 'float-d'];
const spotifySVG = `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.1-10.561-1.14-.418.12-.779-.18-.899-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.66.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.361.18.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38C8.94 5.76 16.14 6 20.58 8.28c.54.3.72 1.02.42 1.56-.3.42-1.02.54-1.56.3z"/></svg>`;

const scene = document.getElementById('scene');

TRACKS.forEach((track, i) => {
  const card = document.createElement('div');
  card.className = `music-card ${floatClasses[i]}`;
  card.id = `card-${i}`;
  card.dataset.track = i;

  card.innerHTML = `
    <button class="close-btn" aria-label="Close">
      <span class="material-symbols-outlined">close</span>
    </button>

    <!-- ── Mini chip row (always visible) ── -->
    <div class="chip-row">
      <div class="card-art-wrap">
        <img class="card-art" src="${track.art}" alt="${track.title}" onerror="this.style.opacity=0.3"/>
        <div class="art-spin-ring"></div>
      </div>
      <div class="chip-info">
        <span class="chip-artist">${track.artist}</span>
        <span class="chip-title">${track.title}</span>
      </div>
      <span class="material-symbols-outlined chip-play-hint">play_circle</span>
    </div>

    <!-- ── Expanded player (only visible when card-active) ── -->
    <div class="player-expand">
      <div class="card-progress-row">
        <div class="progress-track" data-card="${i}">
          <div class="progress-fill" style="width:0%"><div class="progress-dot"></div></div>
        </div>
        <div class="card-times">
          <span class="time-cur">00:00</span>
          <span class="time-dur">${track.duration}</span>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn repeat-btn" aria-label="Repeat">
          <span class="material-symbols-outlined">repeat</span>
        </button>
        <button class="ctrl-btn prev-btn" aria-label="Prev">
          <span class="material-symbols-outlined">skip_previous</span>
        </button>
        <button class="ctrl-btn play-btn" aria-label="Play">
          <span class="material-symbols-outlined play-icon">play_arrow</span>
        </button>
        <button class="ctrl-btn next-btn" aria-label="Next">
          <span class="material-symbols-outlined">skip_next</span>
        </button>
        <button class="like-btn" aria-label="Like">
          <span class="material-symbols-outlined like-icon">favorite</span>
        </button>
      </div>
    </div>
  `;

  scene.appendChild(card);
});

/* ── State ── */
let activeCardId  = null;
let isPlaying     = false;
let audioCtx      = null;
let analyserNode  = null;
let sourceNode    = null;
let dataArr       = null;

/* ── DOM refs ── */
const audio   = document.getElementById('audio');
const canvas  = document.getElementById('vis-canvas');
const ctx2d   = canvas.getContext('2d');
const cards   = () => Array.from(document.querySelectorAll('.music-card'));

/* ── Helpers ── */
function getCard(id) { return document.getElementById('card-' + id); }

function setProgress(card, pct) {
  const fill = card.querySelector('.progress-fill');
  if (fill) fill.style.width = pct + '%';
}

function setTime(card, cur, dur) {
  const cEl = card.querySelector('.time-cur');
  const dEl = card.querySelector('.time-dur');
  if (cEl) cEl.textContent = cur;
  if (dEl) dEl.textContent = dur;
}

function fmt(s) {
  if (!isFinite(s)) return '00:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
}

/* ── Activate a card → animate to center ── */
function activateCard(id) {
  const card = getCard(id);
  if (!card) return;

  if (activeCardId !== null && activeCardId !== id) {
    deactivateCard(activeCardId, false);
  }

  activeCardId = id;
  const track = TRACKS[id];

  card.classList.add('card-active');
  cards().forEach(c => { if (c !== card) c.classList.add('card-faded'); });

  // Load audio — handles both absolute URLs and relative paths
  const newSrc = track.src || '';
  if (newSrc && audio.src !== newSrc) {
    audio.src = newSrc;
  }

  startPlayback(card, id);
}

/* ── Deactivate: float card back to side ── */
function deactivateCard(id, shouldPause = true) {
  if (id === null) return;
  const card = getCard(id);
  if (!card) return;

  card.classList.remove('card-active', 'is-playing');

  const icon = card.querySelector('.play-icon');
  if (icon) icon.textContent = 'play_arrow';

  cards().forEach(c => c.classList.remove('card-faded'));

  if (shouldPause) {
    audio.pause();
    isPlaying = false;
    document.body.classList.remove('playing');
  }

  activeCardId = null;
}

/* ── Playback logic ── */
function startPlayback(card, id) {
  if (!TRACKS[id].src) {
    // No src set — show play button but don't attempt to play
    card.classList.add('is-playing'); // still expand the player
    return;
  }
  setupAudioContext();
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.then(() => {
      isPlaying = true;
      card.classList.add('is-playing');
      document.body.classList.add('playing');
      const icon = card.querySelector('.play-icon');
      if (icon) icon.textContent = 'pause';
    }).catch(() => {
      // Autoplay blocked — user needs to tap play button
    });
  }
}

function togglePlay(card, id) {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    card.classList.remove('is-playing');
    document.body.classList.remove('playing');
    const icon = card.querySelector('.play-icon');
    if (icon) icon.textContent = 'play_arrow';
  } else {
    startPlayback(card, id);
  }
}

/* ── Web Audio Context ── */
function setupAudioContext() {
  if (audioCtx) return;
  audioCtx     = new (window.AudioContext || window.webkitAudioContext)();
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 256;
  sourceNode   = audioCtx.createMediaElementSource(audio);
  sourceNode.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);
  dataArr      = new Uint8Array(analyserNode.frequencyBinCount);
  drawVisualizer();
}

/* ── Canvas Visualizer ── */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

const particles = [];

class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.6 + Math.random() * 2.5;
    this.x = x; this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 0.7 + Math.random() * 0.3;
    this.decay = 0.008 + Math.random() * 0.012;
    this.size  = 1 + Math.random() * 2.5;
    this.color = Math.random() > 0.5 ? '#d0bcff' : '#4cd7f6';
  }
  update() { this.x += this.vx; this.y += this.vy; this.alpha -= this.decay; }
  draw() {
    ctx2d.save();
    ctx2d.globalAlpha = Math.max(0, this.alpha);
    ctx2d.fillStyle   = this.color;
    ctx2d.shadowBlur  = 8;
    ctx2d.shadowColor = this.color;
    ctx2d.beginPath();
    ctx2d.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.restore();
  }
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);

  if (!isPlaying || !analyserNode) {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      if (particles[i].alpha <= 0) particles.splice(i, 1);
      else particles[i].draw();
    }
    return;
  }

  analyserNode.getByteFrequencyData(dataArr);
  let avg = 0;
  for (let i = 0; i < dataArr.length; i++) avg += dataArr[i];
  avg /= dataArr.length;

  const ox = canvas.width  / 2;
  const oy = canvas.height / 2;

  const rings = [
    { color: 'rgba(208,188,255,', r: 90,  mult: 0.22, lw: 2.5 },
    { color: 'rgba(76,215,246,',  r: 140, mult: 0.15, lw: 1.8 },
    { color: 'rgba(251,171,255,', r: 180, mult: 0.10, lw: 1.2 }
  ];

  rings.forEach(ring => {
    ctx2d.save();
    ctx2d.strokeStyle = ring.color + '0.5)';
    ctx2d.lineWidth   = ring.lw;
    ctx2d.shadowBlur  = 18;
    ctx2d.shadowColor = ring.color + '0.6)';
    ctx2d.beginPath();
    const steps = 128;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const fi    = Math.floor((i / steps) * dataArr.length) % dataArr.length;
      const amp   = dataArr[fi] * ring.mult;
      const rr    = ring.r + amp;
      const px    = ox + Math.cos(angle) * rr;
      const py    = oy + Math.sin(angle) * rr;
      i === 0 ? ctx2d.moveTo(px, py) : ctx2d.lineTo(px, py);
    }
    ctx2d.closePath();
    ctx2d.stroke();
    ctx2d.restore();
  });

  if (avg > 35 && Math.random() < 0.5) {
    const count = Math.floor(avg / 28);
    for (let i = 0; i < count; i++) particles.push(new Particle(ox, oy));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
    else particles[i].draw();
  }
}

/* ── Audio progress sync ── */
audio.addEventListener('timeupdate', () => {
  if (activeCardId === null) return;
  const card = getCard(activeCardId);
  if (!card) return;
  const pct = isFinite(audio.duration) ? (audio.currentTime / audio.duration) * 100 : 0;
  setProgress(card, pct);
  setTime(card, fmt(audio.currentTime), fmt(audio.duration));
});

audio.addEventListener('ended', () => {
  const nextId = (activeCardId + 1) % TRACKS.length;
  deactivateCard(activeCardId, false);
  setTimeout(() => activateCard(nextId), 300);
});

/* ── Wire up card interactions (event delegation on #scene) ── */
scene.addEventListener('click', e => {
  const card = e.target.closest('.music-card');
  if (!card) return;
  const id = parseInt(card.dataset.track);

  if (e.target.closest('.close-btn')) {
    deactivateCard(id, true);
    return;
  }
  if (e.target.closest('.play-btn')) {
    if (activeCardId !== id) activateCard(id);
    else togglePlay(card, id);
    return;
  }
  if (e.target.closest('.prev-btn')) {
    const prevId = (id - 1 + TRACKS.length) % TRACKS.length;
    deactivateCard(activeCardId, false);
    setTimeout(() => activateCard(prevId), 300);
    return;
  }
  if (e.target.closest('.next-btn')) {
    const nextId = (id + 1) % TRACKS.length;
    deactivateCard(activeCardId, false);
    setTimeout(() => activateCard(nextId), 300);
    return;
  }
  if (e.target.closest('.repeat-btn')) {
    const btn = card.querySelector('.repeat-btn');
    btn.classList.toggle('active');
    audio.loop = btn.classList.contains('active');
    return;
  }
  if (e.target.closest('.like-btn')) {
    const btn = card.querySelector('.like-btn');
    btn.classList.toggle('liked');
    const icon = btn.querySelector('.like-icon');
    icon.style.fontVariationSettings = btn.classList.contains('liked') ? "'FILL' 1" : "'FILL' 0";
    return;
  }
  if (e.target.closest('.progress-track')) {
    if (!isFinite(audio.duration)) return;
    const rect = e.target.closest('.progress-track').getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
    return;
  }

  // Tapping the chip body → activate
  if (activeCardId !== id) activateCard(id);
});

/* ── Resize ── */
window.addEventListener('resize', resizeCanvas);

/* ── Init ── */
resizeCanvas();
drawVisualizer();
