import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

export default class Location extends Component {

    constructor(props){
        super(props);
    }

    state = {
        viewport: {
            width: 835,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8,
            style: "mapbox://styles/mapbox/streets-v9'"
        }
    };

    render() {
        return (
            <ReactMapGL
                mapboxApiAccessToken={"pk.eyJ1IjoiZGltZWppLWZhbHV5aSIsImEiOiJjam1jaTcyZjY1eWNyM3BwNHZtajYydXZnIn0.Gan6xLSfEl7n7CK6edDz8Q"}
                {...this.state.viewport}
                mapStyle ={'mapbox://styles/mapbox/streets-v9'}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        );
    }
}
