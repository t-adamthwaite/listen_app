import { useState, useEffect } from 'react'
import './App.css'
import Playlist from './Playlist'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

function App() {
  //SearchBar states and handler functions
  const [inputText, setInputText] = useState('');
  function handleInputText(e) {
      setInputText(e.target.value);
  }

  const [searchType, setSearchType] = useState('all');
  function handleSearchType(e) {
      setSearchType(e.target.value)
  }

  const [searchQuery, setSearchQuery] = useState(null);
  function setQuery() {
      if (isSearched && inputText) {
          setSearchQuery(`?=${searchType}&${inputText.replaceAll(' ', '_')}`);
          isSearched = false;
          console.log("false");
      } else {
        setSearchQuery(null);
      }
  }

  let isSearched = false;
  function handleSubmit(e) {
      e.preventDefault();
      isSearched = true;
      console.log("true");
      setQuery();
  }

  //Spotify API access token request
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
          .then(data => console.log(data))
  }, [])


  return (
    <>
      <SearchBar
        inputText={inputText}
        handleInputText={handleInputText}
        searchType={searchType}
        handleSearchType={handleSearchType}
        searchQuery={searchQuery}
        handleSubmit={handleSubmit} />
      <SearchResults
        searchQuery={searchQuery} />
      <Playlist />
    </>
  )
}

export default App
