import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import {SearchBar, VideoDetails, VideoList} from './components';

import youtube from './api/youtube';

class App extends Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('softuni');
    }
    onVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }
handleSubmit = (searchTerm) => {
    youtube.get('search', {
        params: { 
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyCv_jjPrvKd42eXQp6vaI1-3snZKWCErHw',
            q: searchTerm,
    } })
        .then((response) => {
            console.log(response.data.items)
            this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
        });
        
    }
    render() {
        const {selectedVideo, videos} = this.state
        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={ this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetails video={selectedVideo }/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;