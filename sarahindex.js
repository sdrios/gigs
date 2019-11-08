
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

//display popup on-click
map.on('click', 'points', function(e){
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);

})

map.on('mouseenter', 'places', function () {
map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';
});