const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumName = document.getElementById('album-name');
const albumCover = document.getElementById('album-cover');

const tracks = [
    { title: "TU hai kahan", artist: "Raffey | Usama | Ahad", album: "Album 1", src: 'Img/_Tu Hai Kahan_320(PagalWorld.com.sb).mp3', cover: 'Img/2.jpg' },
    { title: "O Sajni Re", artist: "Arijit singh ", album: "Album 2", src: 'Img/O Sajni Re_320(PagalWorld.com.sb).mp3', cover: 'Img/4.jpg' },
    { title: "Soulmate", artist: "Arijit singh | Badshah", album: "Album 3", src: 'Img/_Soulmate_320(PagalWorld.com.sb).mp3', cover: 'Img/3.jpg' },
    { title: "Nadaaniyan", artist: "Akshath | Aisha Ahmed", album: "Album 4", src: 'Img/Nadaaniyan_320(PagalWorld.com.sb).mp3', cover: 'Img/5.jpg' },
    { title: "Perfect", artist: "Ed Sheeran", album: "Album 5", src: 'Img/Ed Sheeran - Perfect (Official Music Video).mp3', cover: 'Img/6.jpg' }
];

let currentTrack = 0;

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack();
}

function loadTrack() {
    const track = tracks[currentTrack];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    albumName.textContent = track.album;
    albumCover.src = track.cover;
    audioPlayer.load();
    togglePlayPause();
}

audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Initialize the player with the first track
loadTrack();
