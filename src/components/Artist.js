import React from 'react';

const Artist = ({artist, playing}) => {

    if (!artist) {
        return null
    }

    const {images, name, followers, genres} = artist

    console.log(artist)
    let style = {
        background: `url("${artist.images[1].url}")`
    }
    return (
        <div className='bouncer x'>
            <div style={style} className="bouncer y">
                {/* <h3>{name}</h3>
                <h3>{followers.total}</h3>
                <p>{genres.join(', ')}</p> */}
                <div id='ripple' className={`${playing ? "ripple" : null}`}  ></div>

            </div>
        </div>
    )
}

export default Artist