import {useState, useEffect} from 'react';

function SearchResults({songList}) {


    return (
        <>
            <p>Search Results Here</p>
            <div>
                {songList.map((song, i) => {
                    return (
                        <div key={i}>
                            <img src={song.album.images[2].url} />
                            <p>{song.name}</p>
                            <p>{song.artists[0].name}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SearchResults;