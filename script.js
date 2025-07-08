console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Zindagi na milegi dobara", filePath: "song/1.mp3", coverPath: "song/1.jpeg"},
    {songName: "Heer ranjha", filePath: "song/2.mp3", coverPath: "song/2.jpeg"},
    {songName: "iktara", filePath: "song/3.mp3", coverPath: "song/3.jpg"},
    {songName: "kites", filePath: "song/4.mp3", coverPath: "song/4.jpg"},
    {songName: "saudebaazi-akrosh", filePath: "song/5.mp3", coverPath: "song/5.jpeg"},
    {songName: "main teri ho gaiya", filePath: "song/6.mp3", coverPath: "song/6.jpeg"},
    {songName: "manja", filePath: "song/7.mp3", coverPath: "song/7.jpeg"},
    {songName: "saibo", filePath: "song/8.mp3", coverPath: "song/8.jpeg"},
    {songName: "mann mera", filePath: "song/9.mp3", coverPath: "song/9.jpeg"},
    {songName: "tera hi rahun", filePath: "song/10.mp3", coverPath: "song/10.jpeg"},
    {songName: "tu kisi rail si", filePath: "song/11.mp3", coverPath: "song/11.jpeg"},
     {songName: "sang hoon tere", filePath: "song/12.mp3", coverPath: "song/12.jpeg"},
      {songName: "tera hone laga hoon", filePath: "song/13.mp3", coverPath: "song/13.jpeg"},
       {songName: "saajna", filePath: "song/14.mp3", coverPath: "song/14.jpeg"},
     
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
   
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=14){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


songItems.forEach((element, i) => {
    if (!songs[i]) return; // skip if song data not available, kitten 💋

    // Set image and name safely
    const img = element.getElementsByTagName("img")[0];
    const name = element.getElementsByClassName("songName")[0];
    const timestamp = element.getElementsByClassName("timestamp")[0];

    if (img) img.src = songs[i].coverPath;
    if (name) name.innerText = songs[i].songName;

    
    let audio = new Audio(songs[i].filePath);
    audio.addEventListener("loadedmetadata", () => {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        
        if (timestamp) {
            timestamp.innerText = `${minutes}:${seconds}`;
        } else {
            console.warn(`No .timestamp found in songItem ${i}, baby 😿`);
        }
    });
});

