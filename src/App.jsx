import { useState, useEffect } from 'react'
import './index.css'
import Playlist from './Playlist'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

function App() {

  const userId = (localStorage.getItem('user_data'))
  const accessToken = (localStorage.getItem('access_token'));
  
  //SearchBar states and handler functions
  const [inputText, setInputText] = useState('');
  function handleInputText(e) {
      setInputText(e.target.value);
  }

  const [searchType, setSearchType] = useState('artist');
  function handleSearchType(e) {
      setSearchType(e.target.value)
  }

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
    if (currentSong) {
      setPlaylist(prev => [...prev, currentSong]);
}}, [currentSong]);

  //remove song from returned song list
  useEffect(() => {
    setSongs(prev => prev.filter(item => item !== currentSong));
  }, [currentSong]);

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
          userId={userId} 
          className='playlist'
          currentTrack={currentSong}
          playlist={playlist}
          token={accessToken}/>
      </div>
    </>
  )
}

export default App
