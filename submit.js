var searchText = ''
var clickCounter = 0
var currentArtist = ''

$("#submit-button").on("click", async function(e){
    e.preventDefault()
    searchText = document.getElementById("search-bar").value
    searchTextJoin = searchText.toLowerCase().split(' ').join('')
    clickCounter += 1
    let features = await parseBITData(searchTextJoin)
    // console.log(features.properties)
    // if (features.properties.data.length === 0) {
    //     console.log("Sorry, no artist!")
    // }
    //console.log(features[0].properties.artist.name)
     $('.results').html(
        `<ul>
            <ls><b> Artist name:</b> ${features[0].properties.artist.name} </ls>
        </ul>`)

        //   <ls><b> Facebook page:</b><a href=> ${features[0].properties.artist.facebook_page_url}</a></ls>

    for(var i = 0; i< features.length;i++){
        //console.log(features[i]);
        $('.results').append(

            `<ul>
                <ls><b> Date:</b> ${features[i].properties.eventDate}</ls>
                <ls><b> Venue:</b> ${features[i].properties.title}</ls>
                <ls><button type="button" class ="btn-sm"><a href='${features[i].properties.description}' target='blank'>Get Tickets</a></button></ls>
                <ls><button type="button" class ="btn-sm" onclick=offMapZoom(${features[i].geometry.coordinates[0]},${features[i].geometry.coordinates[1]})>Zoom to</button><ls>

            </ul>`
        )
    }
    
        //console.log(features); // Ayan console log to see full API call
    if (clickCounter == 1) {
         map.addLayer({
            "id": `${features[0].properties.artist.name}`,
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
    }
    else {
        map.removeLayer(`${currentArtist}`)
        map.addLayer({
            "id": `${features[0].properties.artist.name}`,
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
    }
     currentArtist = features[0].properties.artist.name

     //change cursor to a pointer when the mouse is over the points layer
        map.on('mouseenter', `${currentArtist}`, function () {
        map.getCanvas().style.cursor = 'pointer';
        });
        //change cursor back from pointer when it leaves a point 
        map.on('mouseleave', `${currentArtist}`, function () {
        map.getCanvas().style.cursor = '';
        });
        // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
        map.on('click', `${currentArtist}`, function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates, zoom:9});
        });
})

function offMapZoom(features1,  features2){
   console.log(`${features1}, ${features2}`)
    map.flyTo({center:[features1, features2], zoom:9})
    
}

$("#similar-button").on("click", async function(e){
    e.preventDefault()
    //console.log(similarTextJoin)
    let newArtist = (await fetchSimilarArtist(searchTextJoin))
    document.getElementById("search-bar").value = newArtist
})

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
//