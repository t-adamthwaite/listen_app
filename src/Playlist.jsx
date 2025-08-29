import './index.css'

function Playlist({playlist}) {
    return (
        <>
            <p>playlist here</p>
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
            </div>
        </>
    );
}

export default Playlist;