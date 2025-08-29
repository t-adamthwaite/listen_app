import {useState, useEffect} from 'react';
import './index.css';

function SearchResults({songList}) {

    //const Height = songList[0].album.images[2].height.toString();


    return (
        <>
            <div className='resultsContainer'>
                {songList.map((song, i) => {
                    return (
                        <div className='resultCard' key={i}>
                            <img className='albumCover' src={song.album.images[2].url} />
                            <div className='cardText'>
                                <p className='songTitle'>{song.name}</p>
                                <p className='artistName'>{song.artists[0].name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SearchResults;