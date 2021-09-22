'use strict'

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var randomButton = document.querySelector('#choose-random');
var addButton = document.querySelector('#add-songs');
var songTitle = document.querySelector('#song-title');

var musicList = document.querySelector('.music-list');

var shuffle = document.querySelector('#shuffle');
var prev = document.querySelector('#prev');
var play = document.querySelector('#play');
var next = document.querySelector('#next');
var loop = document.querySelector('#loop');

var audio = document.querySelector('#audio');



//VARIABLE THAT SAVES THE SONGS DATA
var songsData = [];

var songIndex = 0;

//VARIABLE FOR PASS TO A RANDOM SONG
var random = true;
var songsIndices = [];


// =====================================
//   FUNCTIONS
// =====================================

//FUNCTION THAT ADD A SONG TO THE DATA
function AddSong(song) {

  //THE JSON OF THE NEW SONG
  let newSong = {
    name: song.name,
    url: URL.createObjectURL(song),
    minutes: 0,
    seconds: 0
  }


  //CREATE A AUDIO ELEMENT TO GET THE SONG INFO
  const newAudio = document.createElement("audio");
  newAudio.preload = "metadata";
  newAudio.onloadend = () => URL.revokeObjectURL(newAudio.src);
  newAudio.src = newSong.url;

  //GET THE METADATA
  newAudio.addEventListener('loadedmetadata', (e) => {

    let duration = newAudio.duration;

    newSong.minutes = Math.floor(duration/60);

    const seconds = Math.floor(duration%60);
    newSong.seconds = seconds < 10 ? "0" + seconds : seconds;

    //IF THE SONG IS IN THE DATA
    if (songsData.find(song => song.name == newSong.name) == undefined) {

      //ADD THE SONG TO THE ARRAY
      songsData.push(newSong);

      //ADD THE ELEMENT
      let element = `
        <div class="song" data-id="${songsData.length - 1}">
          <div class="set-song"></div>
          <div class="content-song-title">
            <h3 class="song-title">${newSong.name}</h3>
          </div>
          <h3 class="song-duration">${newSong.minutes}:${newSong.seconds}</h3>
        </div>
      `;

      $(musicList).append(element);

    }

  });

}


//FUNCTION THAT DRAW THE PROGRESS BAR IN THE CANVAS
function DrawCanvas() {

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const barWidth = canvasWidth*0.75;
  const margin = (canvasWidth - barWidth) / 2;

  //CLEAR CANVAS
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  //TIME
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);

  //DRAW THE BAR
  ctx.strokeStyle = '#cdcdcd';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(margin, canvasHeight/2);
  ctx.lineTo(canvasWidth - margin, canvasHeight/2);
  ctx.stroke();

  ctx.strokeStyle = '#00a7f7';

  ctx.beginPath();
  ctx.moveTo(margin, 15);
  ctx.lineTo(margin + barWidth * audio.currentTime/audio.duration, 15);
  ctx.stroke();


  //SET THE TEXT STYLE
  ctx.fillStyle = '#fff';
  ctx.font = '15px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  //IF THE SONG IS PLAYED
  if (audio.duration) {
    let minutesText = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
    let secondsText = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
    let text = minutesText + ":" + secondsText;

    //DRAW CURRENT TIME
    ctx.fillText(text, margin/2, canvasHeight/2);

    minutesText = totalMinutes < 10 ? "0" + totalMinutes : totalMinutes;
    secondsText = totalSeconds < 10 ? "0" + totalSeconds : totalSeconds;
    text = minutesText + ":" + secondsText;

    //DRAW DURATION
    ctx.fillText(text, canvasWidth - margin/2, canvasHeight/2);
  }
  //IF NOT
  else {
    ctx.fillText("--:--", margin/2, canvasHeight/2);
    ctx.fillText("--:--", canvasWidth - margin/2, canvasHeight/2);
  }

}

DrawCanvas();


//FUNCION THAT SET THE SONG
function SetSong(){

  const index = songsIndices[songIndex];

  audio.src = songsData[index].url
  songTitle.innerHTML = songsData[index].name;
}


//ADD THE INDEX TO THE ARRAY
function SetIndices() {

  //IF RANDOM MODE IS NOT SLECTED
  if (!random) songIndex = songsIndices[songIndex];

  songsIndices = [];
  let indices = [];

  //GET NORMAL INDICES
  for (var i = 0; i < songsData.length; i++) {
    songsIndices.push(i);
  }

  //GET RANDOM INDICES
  if (random) {
    while (songsIndices.length > 0) {

      const number = Math.floor(Math.random() * songsIndices.length);
      indices.push(songsIndices[number]);
      songsIndices.splice(number, 1);

    }

    songsIndices = indices;

    //GET THE NEW INDEX
    try {
      songsIndices.forEach((index, i) => {
        if (index == songIndex) throw i;
      });
    }
    catch (i){
      songIndex = i;
    }

  }

}
