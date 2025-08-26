import {useState, useEffect} from 'react';

function SearchResults({searchQuery}) {

    //set let for API URL w/o endpoint

    let endpoint = searchQuery;

    //concatinate url with endpoint

    let testData = {};

    if (endpoint) {
        //Fetch request here for API

        //result of request
        testData = {
            artist: 'Billie Eilish',
            song: 'Ocean Eyes'
        };
    } else {
        testData = {};
    }


    return (
        <>
            <p>Search Results Here</p>
            <p>{endpoint}</p>
            <div>
                {/*Parse request below */}
                <p>{testData.artist}</p>
                <p>{testData.song}</p>
            </div>
        </>
    );
}

export default SearchResults;