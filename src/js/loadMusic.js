'use strict'

$(document).ready(function() {

  //WHEN WE CHOOSE THE SONGS
  $(addButton).change((e) => {

    let files = Array.from(e.target.files);

    //ADD THE SONGS TO DATA
    files.forEach((file, i) => {
      AddSong(file);
    });

  });


  //CHOOSE A RANDOM SONG
  $(randomButton).click((e) => {

    SetIndices();

    if (random) songIndex = 0;
    else songIndex = Math.floor(Math.random() * songsIndices.length);

    SetSong();

  });


  //WHEN CLICK IN TO THE LIST
  $(musicList).click((e) => {

    const element = e.target;

    if (element && $(element).hasClass('set-song')) {

      //GET THE INDEX
      let dataId = $(element).parent().data('id');

      if (dataId != songsIndices[songIndex]) {
        songIndex = dataId;

        //RESET INDICES
        SetIndices();

        SetSong();
        DrawCanvas();
      }

    }
  });

  //UPDATE CANVAS
  audio.addEventListener('timeupdate', DrawCanvas);

});
