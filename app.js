const songs = [
    {
        title: "Fake Love",
        artist: "BTS",
        src: "assests/BTS - FAKE LOVE.mp3",
        cover: "assests/download.jpeg"
    },
    {
        title: "Louder than bombs",
        artist: "BTS",
        src: "assests/BTS - Louder than bombs.mp3",
        cover: "assests/59159094.jpg"
    },
    {
        title: "달려라 방탄 (RUN BTS)",
        artist: "BTS",
        src: "assests/BTS - 달려라 방탄 (RUN BTS).mp3",
        cover: "assests/59176695.jpg"
    },
    {
        title: "Life Goes On",
        artist: "BTS",
        src: "assests/BTS - Life Goes On.mp3",
        cover: "assests/59161720.jpg"
    }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const seekBar = document.getElementById("seekBar");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    audio.load();
    updatePlaylistUI();
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

function updatePlaylistUI() {
    playlist.innerHTML = songs.map((song, index) => `
        <div class="playlist-item ${index === currentSong ? 'active' : ''}" data-index="${index}">
          ${song.title} - ${song.artist}
        </div>
      `).join("");
}

playlist.addEventListener("click", (e) => {
    if (e.target.classList.contains("playlist-item")) {
        currentSong = Number(e.target.dataset.index);
        loadSong(currentSong);
        audio.play();
        playBtn.textContent = "⏸";
    }
});

playBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
});

audio.addEventListener("loadedmetadata", () => {
    seekBar.max = audio.duration;
});

seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

loadSong(currentSong);
updatePlaylistUI();