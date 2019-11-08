
//set access token variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic2RyaW9zIiwiYSI6ImNrMm8xbzRpdjB5bG8zZ250N3lncjdidXkifQ.2O_gYD_PFpq2XbsrHQtiyw';

//set map variable 
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
center: [-95.3698, 29.7604], // starting position [lng, lat]
zoom: 9 // starting zoom
});

map.on('load', function(){
    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
        "type": "geojson",
        "data": {
                "type": "FeatureCollection",
                    "features": [{
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [-77.03238901390978, 38.913188059745586]
                    },
                    "properties": {
                    "title": "Mapbox DC",
                    "icon": "monument"
                    }
                    }, {
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [-122.414, 37.776]
                    },
                    "properties": {
                    "title": "Mapbox SF",
                    "icon": "harbor"
                    }
                    }]
                }
        },
        "layout": {
                "icon-image": "{icon}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
                 }
    })
})
function play(element) {
    // retrieve passed data from element attributes
    var songTitle = element.getAttribute('title');
    var albumTitle = element.getAttribute('album');
    var songFile = element.getAttribute('file');
    
    document.getElementById('audio-player').src = songFile;
    document.getElementById('song-album').innerHTML = albumTitle;
    document.getElementById('song-title').innerHTML = songTitle;
    
    console.log(song);
    }
    