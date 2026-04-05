const songs = [
  { id:1, title:'Midnight Vibes', artist:'The Dreamers', emoji:'🌙', duration:'3:24', genre:'Chill' },
  { id:2, title:'Electric Feel', artist:'Future Pulse', emoji:'⚡', duration:'3:51', genre:'Electronic' },
  { id:3, title:'Golden Hour', artist:'Solar Waves', emoji:'☀️', duration:'4:12', genre:'Pop' },
  { id:4, title:'Deep Ocean', artist:'Aqua Tone', emoji:'🌊', duration:'3:33', genre:'Ambient' },
  { id:5, title:'City Lights', artist:'Urban Beat', emoji:'🌃', duration:'2:58', genre:'Hip-Hop' },
  { id:6, title:'Neon Rain', artist:'Synth City', emoji:'🌧️', duration:'3:47', genre:'Synth' },
  { id:7, title:'Mountain High', artist:'Echo Valley', emoji:'🏔️', duration:'4:01', genre:'Folk' },
  { id:8, title:'Retro Wave', artist:'80s Club', emoji:'🎸', duration:'3:15', genre:'Retro' },
];

const playlists = ['Liked Songs','Chill Mix','Workout Beats','Late Night Drive','Focus Mode'];
const artists = [
  { name:'The Dreamers', emoji:'🎤', desc:'Chill artist' },
  { name:'Future Pulse', emoji:'🎧', desc:'Electronic' },
  { name:'Solar Waves', emoji:'🌞', desc:'Pop vibes' },
  { name:'Aqua Tone', emoji:'🎵', desc:'Ambient' },
];

let currentSong = null, isPlaying = false, liked = new Set(), progress = 0, progressInterval = null;

function init() {
  // Playlists
  document.getElementById('playlistList').innerHTML = playlists.map(p =>
    `<div class="playlist-item" onclick="alert('Playing: ${p}')">${p}</div>`
  ).join('');

  // Featured
  document.getElementById('featuredGrid').innerHTML = songs.slice(0,6).map(s => `
    <div class="featured-card" onclick="playSong(${s.id})">
      <div class="featured-card-art">${s.emoji}</div>
      <span>${s.title}</span>
      <span class="play-overlay">▶</span>
    </div>
  `).join('');

  // Recent songs
  document.getElementById('recentGrid').innerHTML = songs.map(s => `
    <div class="song-card" onclick="playSong(${s.id})">
      <div class="song-card-art">${s.emoji}<span class="card-play">▶</span></div>
      <div class="song-card-title">${s.title}</div>
      <div class="song-card-sub">${s.artist}</div>
    </div>
  `).join('');

  // Artists
  document.getElementById('artistGrid').innerHTML = artists.map(a => `
    <div class="song-card" onclick="alert('Artist: ${a.name}')">
      <div class="song-card-art" style="border-radius:50%">${a.emoji}</div>
      <div class="song-card-title">${a.name}</div>
      <div class="song-card-sub">${a.desc}</div>
    </div>
  `).join('');
}

function playSong(id) {
  const song = songs.find(s => s.id === id);
  currentSong = song;
  isPlaying = true;
  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;
  document.getElementById('playerArt').textContent = song.emoji;
  document.getElementById('playBtn').textContent = '⏸';
  document.getElementById('totalTime').textContent = song.duration;
  document.getElementById('likeBtn').textContent = liked.has(id) ? '♥' : '♡';
  document.getElementById('likeBtn').className = 'like-btn' + (liked.has(id) ? ' liked' : '');
  startProgress();
}

function startProgress() {
  clearInterval(progressInterval);
  progress = 0;
  progressInterval = setInterval(() => {
    progress = Math.min(progress + 0.5, 100);
    document.getElementById('progressFill').style.width = progress + '%';
    const totalSecs = 210, elapsed = Math.round(totalSecs * progress / 100);
    const m = Math.floor(elapsed/60), s = String(elapsed%60).padStart(2,'0');
    document.getElementById('currentTime').textContent = `${m}:${s}`;
    if (progress >= 100) nextSong();
  }, 500);
}

function togglePlay() {
  if (!currentSong) { playSong(songs[0].id); return; }
  isPlaying = !isPlaying;
  document.getElementById('playBtn').textContent = isPlaying ? '⏸' : '▶';
  if (isPlaying) startProgress(); else clearInterval(progressInterval);
}

function nextSong() {
  if (!currentSong) return;
  const idx = songs.findIndex(s => s.id === currentSong.id);
  playSong(songs[(idx + 1) % songs.length].id);
}

function prevSong() {
  if (!currentSong) return;
  const idx = songs.findIndex(s => s.id === currentSong.id);
  playSong(songs[(idx - 1 + songs.length) % songs.length].id);
}

function toggleLike() {
  if (!currentSong) return;
  if (liked.has(currentSong.id)) liked.delete(currentSong.id);
  else liked.add(currentSong.id);
  document.getElementById('likeBtn').textContent = liked.has(currentSong.id) ? '♥' : '♡';
  document.getElementById('likeBtn').className = 'like-btn' + (liked.has(currentSong.id) ? ' liked' : '');
}

function seek(e) {
  const bar = e.currentTarget;
  const rect = bar.getBoundingClientRect();
  progress = ((e.clientX - rect.left) / rect.width) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

init();