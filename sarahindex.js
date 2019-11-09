
//set access token variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic2RyaW9zIiwiYSI6ImNrMm8xbzRpdjB5bG8zZ250N3lncjdidXkifQ.2O_gYD_PFpq2XbsrHQtiyw';

//set map variable 
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
center: [-97.6764, 38.4067], // starting position [lng, lat]
zoom: 3.55 // starting zoom
});

//function that loads features on map load 
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
                    "description":"test description!",
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
                     "description":"test description!",
                    "icon": "harbor"
                    }
                    },{
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [-95.568370, 29.795564]
                    },
                    "properties": {
                    "title": "DigitalCrafts",
                    "description":"<strong>Houston Digital Crafts Campus</strong>, <br> located at The Cannon",
                    "icon": "monument"
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

//display popup on-click event at the location of feature w/ description HTML from its feature properties
map.on('click', 'points', function(e){
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    //ensure that if map is zoomed out, multiple copies of the feature are visible; the popup appears over the copy being pointed to
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
})

//change cursor to a pointer when the moise is over the points layer
map.on('mouseenter', 'places', function () {
map.getCanvas().style.cursor = 'pointer';
});
//change cursor back from pointer when it leaves a point 
map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';
});

