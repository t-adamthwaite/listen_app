import { useState, useEffect } from 'react';

function SearchBar( {inputText, handleInputText, searchType, handleSearchType, searchQuery, handleSubmit}) {


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
                    onChange={handleInputText} 
                    value={inputText}/>
                <button type='submit'>{'\u{1F50D} Search'}</button>
            </form>
            <p>{searchQuery}</p>
        </>
        
    )
}

export default SearchBar;