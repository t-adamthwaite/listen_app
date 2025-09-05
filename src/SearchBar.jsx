import { useState, useEffect } from 'react';

function SearchBar( {inputText, handleInputText, searchType, handleSearchType, handleSubmit}) {


    return (
        <>
            <h1 className='banner'><span className='bannerSpan'>List</span>en!</h1>
            <form className='searchBar' onSubmit={handleSubmit}>
                {/* select object should create query string for search from list of song, artist, genre, or all*/}
                <select
                    className='searchType' 
                    onChange={handleSearchType} id='search-type' 
                    name='search-type'
                    value={searchType}>
                        <option value='track'>{'song'}</option>
                            <option value='artist'>{'artist'}</option>
                    <option value='genre'>{'genre'}</option>
                </select>
                <input
                    className='searchBox' 
                    placeholder='Search'
                    name='search' 
                    id='search' 
                    type='text' 
                    onChange={handleInputText} 
                    value={inputText}/>
                <button 
                    className='searchButton'
                    type='submit'>{'\u{1F50D} Search'}</button>
            </form>
        </>
        
    )
}

export default SearchBar;