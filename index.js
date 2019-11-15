//set access token variable
mapboxgl.accessToken = 'pk.eyJ1Ijoic2RyaW9zIiwiYSI6ImNrMm8xbzRpdjB5bG8zZ250N3lncjdidXkifQ.2O_gYD_PFpq2XbsrHQtiyw';

//set map variable 
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
sprite: "mapbox://sprites/mapbox/bright-v15",
attributionControl: false,
center: [-97.6764, 38.4067], // starting position [lng, lat]
zoom: 3.55 // starting zoom
});


//display popup on-click event at the location of feature w/ description HTML from its feature properties
// map.on('click', `${searchText}`, function(e){
//     var coordinates = e.features[0].geometry.coordinates.slice();
//     var description = e.features[0].properties.description;

//     //ensure that if map is zoomed out, multiple copies of the feature are visible; the popup appears over the copy being pointed to
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }
    
//     new mapboxgl.Popup()
//     .setLngLat(coordinates)
//     .setHTML(description)
//     .addTo(map);
// })



//add navigation controls to map
map.addControl(new mapboxgl.NavigationControl());
