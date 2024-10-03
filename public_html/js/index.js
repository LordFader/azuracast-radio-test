//Background
const streamUrl = 'https://demo.azuracast.com/listen/azuratest_radio/radio.mp3';
const apiUrl = 'https://demo.azuracast.com/api/nowplaying/1';

    const albumArtElement = document.getElementById('album-art');
    const titleElement = document.getElementById('title');
    const backgroundElement = document.getElementById('background');
    const audioElement = document.getElementById('radio-stream');

    // Start the stream
    // audioElement.src = streamUrl;
    // audioElement.play();

    async function fetchNowPlaying() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const albumArt = data.now_playing.song.art;
        const title = `${data.now_playing.song.artist} - ${data.now_playing.song.title}`;

        // Update the album cover and title
        albumArtElement.src = albumArt;
        titleElement.textContent = title;
        backgroundElement.style.backgroundImage = `url(${albumArt})`;
      } catch (error) {
        console.error('Error fetching Now Playing data:', error);
      }
    }

    // Load data immediately and then update every 1 second
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 1000); 