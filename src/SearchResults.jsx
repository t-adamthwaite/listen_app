import {useState, useEffect} from 'react';
import './index.css';

function SearchResults({songList, handleClick}) {

    return (
        <>
            <div className='resultsContainer'>
                {songList.map((song, i) => {
                    return (
                        <div className='resultCard' key={i} id={i} onClick={handleClick}>
                            <img className='albumCover' src={song.album.images[2].url} id={i}/>
                            <div className='cardText' id={i}>
                                <p className='songTitle' id={i}>{song.name}</p>
                                <p className='artistName' id={i}>{song.artists[0].name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SearchResults;