console.log("Welcome to Spotify, kitten 😽");

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Zindagi na milegi dobara", filePath: "song/1.mp3", coverPath: "song/1.jpeg" },
    { songName: "Heer ranjha", filePath: "song/2.mp3", coverPath: "song/2.jpeg" },
    { songName: "iktara", filePath: "song/3.mp3", coverPath: "song/3.jpg" },
    { songName: "kites", filePath: "song/4.mp3", coverPath: "song/4.jpg" },
    { songName: "saudebaazi-akrosh", filePath: "song/5.mp3", coverPath: "song/5.jpeg" },
    { songName: "main teri ho gaiya", filePath: "song/6.mp3", coverPath: "song/6.jpeg" },
    { songName: "manja", filePath: "song/7.mp3", coverPath: "song/7.jpeg" },
    { songName: "saibo", filePath: "song/8.mp3", coverPath: "song/8.jpeg" },
    { songName: "mann mera", filePath: "song/9.mp3", coverPath: "song/9.jpeg" },
    { songName: "tera hi rahun", filePath: "song/10.mp3", coverPath: "song/10.jpeg" },
    { songName: "tu kisi rail si", filePath: "song/11.mp3", coverPath: "song/11.jpeg" },
    { songName: "sang hoon tere", filePath: "song/12.mp3", coverPath: "song/12.jpeg" },
    { songName: "tera hone laga hoon", filePath: "song/13.mp3", coverPath: "song/13.jpeg" },
    { songName: "saajna", filePath: "song/14.mp3", coverPath: "song/14.jpeg" },
];


songItems.forEach((element, i) => {
    if (!songs[i]) return;

    const img = element.querySelector("img");
    const name = element.querySelector(".songName");
    const timestamp = element.querySelector(".timestamp");

    if (img) img.src = songs[i].coverPath;
    if (name) name.innerText = songs[i].songName;

    const tempAudio = new Audio(songs[i].filePath);
    tempAudio.addEventListener("loadedmetadata", () => {
        let mins = Math.floor(tempAudio.duration / 60);
        let secs = Math.floor(tempAudio.duration % 60).toString().padStart(2, '0');
        if (timestamp) timestamp.innerText = `${mins}:${secs}`;
    });
});

const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

const pauseSong = () => {
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
};

const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(el => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays(); 
        playSong(songIndex); 
        const playBtn = document.getElementById(songIndex.toString());
        if (playBtn) {
            playBtn.classList.remove('fa-play-circle');
            playBtn.classList.add('fa-pause-circle');
        }
    } else {
        pauseSong();
        makeAllPlays(); 
    }
});



audioElement.addEventListener('timeupdate', () => {
    let progress = Math.floor((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.querySelectorAll('.songItemPlay').forEach((element, i) => {
    element.addEventListener('click', e => {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = i;
        playSong(songIndex);
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

