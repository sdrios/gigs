var searchText = ''
 
$("#search-bar").on("input", function(e){
searchText = e.target.value
searchTextJoin = e.target.value.toLowerCase().split(' ').join('')

})

$("#submit-button").on("click", async function(e){
    e.preventDefault()

    searchResults = `<p>${searchText}</p>`
    $('.results').append(searchResults)

    let features = await parseBITData(searchTextJoin)

        map.addLayer({
            "id": `${searchText}`,
            "type": "symbol",
            "source": {
            "type": "geojson",
            "data": {
                    "type": "FeatureCollection",
                        "features": features
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
    //map.removeLayer("points")
})

function guidGenerator() {
   var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}



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