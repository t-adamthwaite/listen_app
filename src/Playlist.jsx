import { useState, useEffect } from 'react';
import './index.css'



function Playlist({currentTrack, playlist, userId, token}) {

    const [submissionTracks, setSubmissionTracks] = useState([]);
    useEffect(() => {
        if (currentTrack) {
            setSubmissionTracks((prev) => [...prev, 'spotify:track:' + currentTrack.id])}}, [playlist]);

    console.log(submissionTracks);
    
    
    const [playlistName, setPlaylistName] = useState('My Playlist');
    function handlePlaylistName(e) {
        e.preventDefault();
        setPlaylistName(e.target.value);
    }


    let playlistId;
    async function createPlaylist(token, userId, playlistName) {
         const createNewParams = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'My Spotify Playlist',
                public: false
            })
        }; 

        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, createNewParams)
            .then(response => response.json())
            .then((data) => {playlistId = data.id});

    }

    async function addPlaylistSongs(playlistId) {
        const addSongsParams = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: submissionTracks,
                position: 0
            })
    };

        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, addSongsParams)
            .then(response => response.json())
            .then(data => console.log(data));
    }



    async function handlePost(e) {
        e.preventDefault();
        await createPlaylist(token, userId, playlistName);
        console.log(playlistId);
        await addPlaylistSongs(playlistId);
    }
       


    return (
        <>
            <p>{userId}</p>
            <div className='playlistContainer'>
                {playlist.map((song, i) => {
                    return (
                        <div className='playlistCard' key={i} id={i}>
                            <img className='albumCover' src={song.album.images[2].url} id={i}/>
                            <div className='cardText' id={i}>
                                <p className='songTitle' id={i}>{song.name}</p>
                                <p className='artistName' id={i}>{song.artists[0].name}</p>
                            </div>
                        </div>
                    );
                })}
                <form id='submission-form'>
                    <input name='name' type='text' placeholder='Enter Playlist Name' value={playlistName} onChange={handlePlaylistName} />
                    <button type='submit' onClick={handlePost}>Post to Spotify!</button>
                </form>
            </div>
        </>
    );
}

export default Playlist;