const axios = require('axios');

// stab rabbit api key
const apiKey = '4a28964225d2c59da62da66afe9d9552'; // Replace with your actual API key
const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
const endpoint = 'matcher.lyrics.get';

const lyricsapiController = {};

lyricsapiController.getLyrics = async () => {
  try {
    // const { songname, artist, trackId } = req.body;
    const params = {
      q_track: "don't stop believin",
      q_artist: 'journey',
      apikey: apiKey,
    };
    console.log('in lyrics controller');
    const response = await axios.get(baseUrl + endpoint, { params });

    if (response.status === 200) {
      const lyrics = response.data.message.body.lyrics;

      if (lyrics) {
        const lyricsBody = lyrics.lyrics_body;
        //console.log(lyricsBody)
        // console.log('Lyrics:\n', lyricsBody);
        return lyricsBody;
        // res.locals.artist = artist;
        // res.locals.songname = songname;
        // res.locals.trackId = trackId;
        // return next();
      } else {
        console.log('No lyrics found');
        throw new Error('No lyrics found');
      }
    } else {
      console.log('An error occurred:', response.status);
      throw new Error('API request failed');
    }
  } catch (error) {
    console.error('An error occurred in getLyrics:', error.message);
    // return next(error);
  }
};

module.exports = lyricsapiController;
