var dataResponse = $.getJSON("/data.json", function(json){
    console.log("test");
    console.log(json);
}); //Ayan changed: testing data from JSON file, changed file ext to .json instead of .js so file can be read correctly
var searchText = ''
 
$("#search-bar").on("input", function(e){
searchText = e.target.value
searchTextJoin = e.target.value.toLowerCase().split(' ').join('')

})

$("#submit-button").on("click", async function(e){
    e.preventDefault()

    searchResults = `<p>${searchText}</p>`
    let features = await parseBITData(searchTextJoin) // Ayan moved let features before append so API call would work 
     $('.results').append(
        `<ul>
            <ls><b> Artist name:</b> ${features[0].properties.artist.name} </ls>
            <ls><b> Facebook page:</b><a href=> ${features[0].properties.artist.facebook_page_url}</a></ls>
        </ul>`)
    for(var i = 0; i< features.length;i++){
        console.log(features[i].properties.title);
        $('.results').append(

            `<ul>
                <ls><b> Date:</b> ${features[i].properties.eventDate}</ls>
                <ls><b> Venue:</b> ${features[i].properties.title}</ls>
            </ul>`
        )
    }//Ayan fixed append to show Artist name, FB page, & for loop for Date & venue information for each artist (made it UI friendly)
    // still need to clear results in <div class=results> after new search 
    // still need to make datetime more UI readable
    

    //let features = await parseBITData(searchTextJoin)
    // Ayan moved let to line 17 (see note)

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
        console.log(features); // Ayan console log to see full API call
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