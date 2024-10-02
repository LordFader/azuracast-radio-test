//Sticky Audio Player
var nowPlayingTimeout;
var nowPlaying;

function loadNowPlaying() {
  $.ajax({
    cache: false,
    dataType: "json",
    url: 'https://demo.azuracast.com/api/nowplaying/1',
    method: 'GET',
    success: function (np) {
      // Do something with the Now Playing data.
      nowPlaying = np;

      var station_name = np.station.name;
      var station_description = np.station.description;
      var info = np.now_playing.song.artist + " - " + np.now_playing.song.title + " - " + np.now_playing.song.album + " - " + np.now_playing.song.genre;
      var now = np.now_playing.song.text;
      var art_url = np.now_playing.song.art;
      var playlist = np.now_playing.playlist;
      var album_genre = np.now_playing.song.album + " - " + np.now_playing.song.genre;
      var next_playlist = np.playing_next.playlist;
      var art_url_next = np.playing_next.song.art;
      var time_play = np.now_playing.elapsed;
      var dj_name = np.now_playing.streamer;
    
      var time = np.now_playing.elapsed

      var on_air = np.live.is_live;
      var live = '<i class="fas fa-cog fa-spin fa-3x fa-fw" aria-hidden="true" title="LIVE"></i>';
      var onair = '<i class="fas fa-cog fa-3x fa-fw" aria-hidden="true" title="OnAir"></i>';
      var off_line = '<i class="fas fa-cog fa-3x fa-fw" aria-hidden="true" title="OffLine"></i>';

      if (on_air === true) {
        $('#icon').html(live + "<br><h2>::: LIVE :::</h2>");
      } else if (on_air === false) {
        $('#icon').html(onair + "<br><h3>::: NOW on AIR :::</h3>");
      } else {
        $('#icon').html(off_line + "<br><h4>::: OffLine :::</h4>");
      }

      $(".output").html(info + '<br><img src="' + art_url + '" />');

      $(".station-name").text(station_name);
      $(".station-description").text(station_description);

      $(".stickyAudioPlayerBox figure").html('<img src="' + art_url + '" class="img-fluid" />');
      $(".stickyAudioPlayerBox .player-data p span").html(now);

      $(".now").html(now);
      $(".album-art").html('<img src="' + art_url + '" class="img-fluid" />');
      $('.playlist').text(np.now_playing.playlist);
      $('.playlist-next').text('Next: ' + np.playing_next.playlist);
      $('.album-genre').text(album_genre);
      $('.album').html('Album: ' + np.now_playing.song.album);
      $('.genre').html('Genre: ' + np.now_playing.song.genre);
    
      $(".playing-next-art").html('<img src="' + art_url_next + '" class="img-fluid" />');

      $(".live-dj-name").text(np.live.streamer_name);
      $(".live-dj-art").html('<img src="' + np.live.art + '" class="img-fluid" style="width:20px;height:20px;" />');

   


      nowPlayingTimeout = setTimeout(loadNowPlaying, 15000);
    }
  }).fail(function () {
    nowPlayingTimeout = setTimeout(loadNowPlaying, 30000);
  });
}

$(function () {
  loadNowPlaying();
});




var inline, run;
$(document).ready(function () {
  run = $('body').stickyAudioPlayer(
    {
      url: 'https://demo.azuracast.com/listen/azuratest_radio/radio.mp3',
      position: 'bottom', //'bottom'|'top'|'inline'
      text: '...',
      image: 'images/AzuraCast Default Album Art.png',
      download: 'https://demo.azuracast.com/public/azuratest_radio/playlist.m3u', //download link
      volume: 90,
      repeat: false,
    }
  );

  inline = $('.inline-player').stickyAudioPlayer(
    {
      url: 'https://demo.azuracast.com/listen/azuratest_radio/radio.mp3',
      position: 'inline',
      text: '...',
      image: 'images/AzuraCast Default Album Art.png',
      download: 'https://demo.azuracast.com/public/azuratest_radio/playlist.m3u', //download link
      volume: 90,
      image: 'images/AzuraCast Default Album Art.png',
      theme: 'compact',
      repeat: true,
    }
  );

  // setTimeout(function(){run.hide();},3000);
  // setTimeout(function(){run.show();},5000);
  // setTimeout(function(){run.setVolume(20);},7000);
  // setTimeout(function(){run.remove();},9000);
});
