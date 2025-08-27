import { useState, useEffect } from 'react';

function SearchBar( {inputText, handleInputText, searchType, handleSearchType, handleSubmit}) {


    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* select object should create query string for search from list of song, artist, genre, or all*/}
                <select 
                    onChange={handleSearchType} id='search-type' 
                    name='search-type'
                    value={searchType}>
                        <option value='track'>{'song'}</option>
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
        </>
        
    )
}

export default SearchBar;