import { useState } from 'react';

function SearchBar() {

    const [text, setText] = useState('');
    function handleInputText(e) {
        setText(e.target.value);
    }

    const [searchType, setSearchType] = useState('all');
    function handleSearchType(e) {
        setSearchType(e.target.value)
    }

    const [searchQuery, setSearchQuery] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(`?=${searchType}+${text}`);
        setSearchType('all');
        setText('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* select object should create query string for search from list of song, artist, genre, or all*/}
                <select 
                    onChange={handleSearchType} id='search-type' 
                    name='search-type'
                    value={searchType}>
                        <option value='all'>{'all'}</option>
                        <option value='song'>{'song'}</option>
                            <option value='artist'>{'artist'}</option>
                    <option value='genre'>{'genre'}</option>
                </select>
                <input 
                    placeholder='Search'
                    name='search' 
                    id='search' 
                    type='text' 
                    onChange={handleInputText} value={text}/>
                <input 
                    type='submit' 
                    value={'\u{1F50D}'}
                 />
            </form>
            <p>{searchQuery}</p>
        </>
        
    )
}

export default SearchBar;