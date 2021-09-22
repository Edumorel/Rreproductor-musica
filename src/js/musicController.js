'use strict'

//EVENT CONTROLLER
$(document).ready((e) => {

  //===========PAUSE AND PLAY===========
  $(play).click((e) => {

    if (audio.src.length > 0) {
      if ($(play).hasClass('icon-pause')) audio.play();
      else audio.pause();
    }

  });

  audio.addEventListener('play', () => {
    $(play).removeClass('icon-pause');
    $(play).addClass('icon-play');
  });
  audio.addEventListener('pause', () => {
    $(play).removeClass('icon-play');
    $(play).addClass('icon-pause');
  });


  //============PASS THE SONG============
  $(next).click((e) =>{
    if (songsData.length > 1) {
      songIndex = songIndex < songsData.length - 1 ? songIndex + 1 : 0;
      SetSong();
    }
  });

  $(prev).click((e) =>{
    if (songsData.length > 1) {
      songIndex = songIndex > 0 ? songIndex - 1 : songsData.length - 1;
      SetSong();
    }
  });

  audio.addEventListener('ended', (e) => {
    if (songsData.length > 1 && !audio.loop) {
      songIndex = songIndex < songsData.length - 1 ? songIndex + 1 : 0;
      SetSong();
    }
  });


  //============SET THE LOOP============
  $(loop).click((e) => {
    const isLoop = audio.loop;

    if (isLoop) {
      audio.loop = false;
      $(loop).removeClass('icon-loop');
      $(loop).addClass('icon-right');
    }
    else {
      audio.loop = true;
      $(loop).removeClass('icon-right');
      $(loop).addClass('icon-loop');
    }

  });


  //=============SET RANDOM=============
  $(shuffle).click((e) => {
    random = random ? false : true;

    if ($(shuffle).hasClass('active'))  $(shuffle).removeClass('active');
    else $(shuffle).addClass('active');

    SetIndices();

  });

});
