import React, { Component } from 'react'
// import Artist from './Artist'

 class Search extends Component {

    state = {isClicked: false}

    handleClick = () => {
        this.setState({isClicked : !this.state.isClicked});
    }

    render() {
        return (
        <React.Fragment>
        {/* <Artist/> */}


        <div className={`search ${this.state.isClicked ? "open" : ""}`}>
            <input placeholder={this.props.placeholder} onKeyPress={this.props.onKeyPress} onChange={this.props.onChange} type="search" className="search-box" />
            <span onClick={this.handleClick} className="search-button">
            <span className="search-icon"></span>
            </span>
        </div>
        </React.Fragment>
        
        )
    }
}

export default Search