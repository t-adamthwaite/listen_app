import { useState, useEffect } from 'react'
import './index.css'
import Playlist from './Playlist'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

function App() {
  //SearchBar states and handler functions
  const [inputText, setInputText] = useState('');
  function handleInputText(e) {
      setInputText(e.target.value);
  }

  const [searchType, setSearchType] = useState('artist');
  function handleSearchType(e) {
      setSearchType(e.target.value)
  }
 

  //Spotify API access token request
  const [accessToken, setAccessToken] = useState('');
  const clientID = '9a1429f9ade9438783281ab6449e78bd';
  const clientSecret = 'eb82f51b03da4576b15ef28efbda10e8';
  useEffect(() => {
      const authParams =  {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
      };

      fetch('https://accounts.spotify.com/api/token', authParams)
          .then(request => request.json())
          .then(data => setAccessToken(data.access_token))
  }, [])


  //state to hold our data
  const [songs, setSongs] = useState([]);
  //search function to pass to components
  async function handleSearch(e) {
    e.preventDefault();
  //Generic params for search using API
    const requestParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
  //Getting Songs data
    //by artist
    if (searchType === 'artist') {
      await fetch('https://api.spotify.com/v1/search?offset=0&limit=50&type=track&q=artist:' + inputText.replaceAll(' ', '+'), requestParams)
        .then(response => response.json())
        .then(data => setSongs(data.tracks.items));
    //by track
    } else if (searchType === 'track') {
      await fetch('https://api.spotify.com/v1/search?offset=0&limit=50&type=track&q=track:' + inputText.replaceAll(' ', "+"), requestParams)
        .then(response => response.json())
        .then(data => setSongs(data.tracks.items));
    } else if (searchType === 'genre') {
      await fetch('https://api.spotify.com/v1/search?offset=0&limit=50&type=track&q=genre:' + inputText.replaceAll(' ', '+'), requestParams)
        .then(request => request.json())
        .then(data => setSongs(data.tracks.items));
    }
  }

  //transfer songs from results to playlist
    //Get array for song on click
  const [currentSong, setCurrentSong] = useState(null);
  function handleClickResults(e) {
    const resultIndex = e.target.id;
    setCurrentSong(songs[resultIndex]);
  }
  //add song to playlist
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    setPlaylist(prev => [...prev, currentSong]);
  }, [currentSong]);
  //contingency for null song info
  for (let i = 0; i < playlist.length; i++) {
      if (playlist[i] === null) {
        playlist.splice(i, 1);
      }
    };

  //remove song from returned song list
  useEffect(() => {
    setSongs(prev => prev.filter(item => item !== currentSong));
  }, [currentSong]);

  console.log(songs);
  console.log(currentSong);
  console.log(playlist);

  return (
    <>
      <div className='app'>
        <SearchBar
          className='searchBar'
          inputText={inputText}
          handleInputText={handleInputText}
          searchType={searchType}
          handleSearchType={handleSearchType}
          handleSubmit={handleSearch} />
        <SearchResults 
          songList={songs}
          handleClick={handleClickResults}/>
        <Playlist 
          className='playlist'
          playlist={playlist}/>
      </div>
    </>
  )
}

export default App
