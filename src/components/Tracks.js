import React from 'react'

const Tracks = ({state}) => {

    if (state.tracks) {
        console.log(state.tracks)
    }

    const playAudio = (previewUrl) => () => {
        const audio = new Audio(previewUrl)

        if (!this.state.playing) {
            audio.play()
            this.setState({playing:true, audio, playingPreviewUrl: previewUrl})
        }   else {
            this.state.audio.pause();

            if (this.state.playingPreviewUrl === previewUrl) {
                this.setState({playing: false})
            }   else {
                audio.play();
                this.setState({audio, playingPreviewUrl: previewUrl})
            }
        }
    }
    const tracksComponent = state.tracks ? state.tracks.map(({id, name, album, preview_url}, index) => {
        return (
            <div 
            key={id} 
            onClick={playAudio(preview_url, id)}
            style={{backgroundImage: `url('${album.images[0].url}')`}}className='card'>
            
                <div className="card-text">
                    <h3 className={`${name.length > 16 ? "small-text" : null}`}>{name}</h3>
                    <h4 className={`${album.name.length > 15 && name.length > 16 ? "tiny-text" : null}`}>{album.release_date} &middot; {album.name}</h4>
                </div>
            </div>
        )
    }) : null

    return (
        <div className='track'>
            {tracksComponent}
        </div>
    )
}

export default Tracks


// import React, { Component } from 'react'

// class Tracks extends Component {
//     state = {playing: false, audio: null, playingPreviewUrl: null}

//     playAudio = (previewUrl, id) => () => {
//         const audio = new Audio(previewUrl)

//         if (!this.state.playing) {
//             audio.play()
//             this.setState({playing:true, audio, playingPreviewUrl: previewUrl})
//         }   else {
//             this.state.audio.pause();

//             if (this.state.playingPreviewUrl === previewUrl) {
//                 this.setState({playing: false})
//             }   else {
//                 audio.play();
//                 this.setState({audio, playingPreviewUrl: previewUrl})
//             }
//         }
//     }

    

//     render() {
//         const {tracks} = this.props


//         return (
//             <React.Fragment>

//             <div className='track'>
//                 {tracks.map(({id, name, album, preview_url}, index) => {
//                     return (
//                         <div  
//                         key={id} 
//                         onClick={this.playAudio(preview_url, id)}
//                         >
//                             <h2>{name}</h2>
//                             <img className={this.state.playing ? "card-img playing" : 'card-img'} src={album.images[0].url} alt='album track'/>
                            
//                         </div>
//                     )
//                 })}
//             </div>
//             </React.Fragment>
            
//         )
//     }
// }