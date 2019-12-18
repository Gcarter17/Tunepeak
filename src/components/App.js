import React, {Component} from 'react';
import '../styles/index.css'
import Artist from './Artist'
import Tracks from './Tracks'
import Search from './Search'
import ErrorBoundary from './ErrorBoundary'

const API_ADDRESS='https://spotify-api-wrapper.appspot.com'

class App extends Component {   
    state = {
        artistQuery: '', 
        artist: null, 
        tracks:[], 
        playing: false, 
        audio: null, 
        playingPreviewUrl: null
    }

    updateArtistQuery = (event) => {
        this.setState({artistQuery: event.target.value}) //event.target.value is equal to what is typed into the search bar
    }

    searchArtist = () => {
        fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
        // fetch(`${API_ADDRESS}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)   //logs the json that is being returned from the api
            if (json.artists.total > 0) {
                const artist = json.artists.items[0]
                this.setState({artist})
                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                    .then(response => response.json())
                    .then(json => this.setState({tracks: json.tracks}))
                    .catch(error => alert(error.message))
            }
        
        })
        .catch(error => alert(error.message))
    }

    playAudio = (previewUrl) => () => {
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

    // customSearch = () => {
    //     fetch(`${API_ADDRESS}`)
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log(json)
    //     })
    // }

    handleKeyPress = event => {     //pressing enter is the same as the button
        if (event.key === 'Enter') {
            this.searchArtist()
        }
    }

    render() {

        console.log(this.state)

        return (
            <React.Fragment>
            <Search
                playing={this.state.playing}
                artist={this.state.artist}
                onChange={this.updateArtistQuery} 
                onKeyPress={this.handleKeyPress} 
                placeholder='Search for an artist'
            />
            <ErrorBoundary>
            <Artist artist={this.state.artist} playing={this.state.playing}/>
                {/* <Tracks state={this.state}/> */}
                    <div className='track'>
                    {this.state.tracks.map(({id, name, album, preview_url}, index) => {
                        return (
                            <div 
                            key={id} 
                            onClick={this.playAudio(preview_url, id)}
                            style={{backgroundImage: `url('${album.images[0].url}')`}}className='card'>
                            
                                <div className="card-text">
                                    <h3 className={`${name.length > 16 ? "small-text" : null}`}>{name}</h3>
                                    <h4 className={`${album.name.length > 15 && name.length > 16 ? "tiny-text" : null}`}>{album.release_date} &middot; {album.name}</h4>
                                </div>
                                <video className="card-video" controls name="media"><source src={preview_url} type="audio/mp3"/></video>
                            </div>
                        )
                    })}
                    
                    </div>

                    {/* <div className='track'>
                    <div 
                            onClick={this.playAudio("https://p.scdn.co/mp3-preview/6b462b2d89ed30b669470c39c65b0f04d6ac740b?cid=bda39c7852de422b8f3f9e50b526f361")}
                    style={{backgroundImage: `url('https://i.scdn.co/image/ab67616d0000b2736a21b97de47168df4f0c1993')`}}className='card'>
                        
                        <div className="card-text">
                        <h3>Lonely boy text</h3>
                        <h4>release year &middot; album name &middot;</h4>
                        </div>
                    </div>
                    <video className="card-video" controls name="media"><source src="https://p.scdn.co/mp3-preview/6b462b2d89ed30b669470c39c65b0f04d6ac740b?cid=bda39c7852de422b8f3f9e50b526f361" type="audio/mp3"/></video>
                </div> */}

            </ErrorBoundary>
            
            
            </React.Fragment>
        )
    }
}

export default App;

                        // <div  
                        // key={id} 
                        // onClick={this.playAudio(preview_url, id)}
                        // >
                        //     <h2>{name}</h2>
                        //     <img className={this.state.playing ? "card-img playing" : 'card-img'} src={album.images[0].url} alt='album track'/>
                            
                        // </div>


{/* <input 
                    onChange={this.updateArtistQuery} 
                    onKeyPress={this.handleKeyPress} 
                    placeholder='Search for an artist'/>
                <button onClick={this.searchArtist}>Search</button> */}

// const myFetch = (url) => {
//     return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText)
//       }
//       return response.json()
//     })
//   }

                