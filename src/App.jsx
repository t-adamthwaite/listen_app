import { useState } from 'react'
import './App.css'
import Playlist from './Playlist'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

function App() {

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
      if (ifSearched) {
          setSearchQuery(`?=${searchType}&${inputText.replaceAll(' ', '_')}`);
          ifSearched = false;
          console.log("false");
      }
  }

  let ifSearched = false;
  function handleSubmit(e) {
      e.preventDefault();
      ifSearched = true;
      console.log("true");
      setQuery();
  }


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
