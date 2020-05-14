import React from 'react';
import mapboxgl from 'mapbox-gl';

//set access token variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic2RyaW9zIiwiYSI6ImNrMm8xbzRpdjB5bG8zZ250N3lncjdidXkifQ.2O_gYD_PFpq2XbsrHQtiyw';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -97.6764,
            lat: 38.4067,
            zoom: 3.55
        };
    }

    componentDidMount() {

        //set map variable 
        var map = new mapboxgl.Map({
            container: this.mapContainer, // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            sprite: "mapbox://sprites/mapbox/bright-v15",
            center: [this.state.lng, this.state.lat], // starting position [lng, lat]
            zoom: this.state.zoom // starting zoom
        });

        //add navigation controls to map
        map.addControl(new mapboxgl.NavigationControl());
    }


    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )

    }
}

export default Map;