var searchText = ''
var clickCounter = 0
var currentArtist = ''
 
// $("#search-bar").on("input", function(e){
// searchText = e.target.value

// })

$("#submit-button").on("click", async function(e){
    e.preventDefault()
    searchText = document.getElementById("search-bar").value
    searchTextJoin = searchText.toLowerCase().split(' ').join('')
    clickCounter += 1
    console.log(clickCounter)
    let features = await parseBITData(searchTextJoin) 
    
     $('.results').html(
        `<ul>
            <ls><b> Artist name:</b> ${features[0].properties.artist.name} </ls>
        </ul>`)


        $('.results').append(
            renderConcerts(features)
        )
    
        //console.log(features); // Ayan console log to see full API call. ----------// .toString = ("YYYY-MM-dd HH:mm:ss") or  >moment().format("YYYY-MM-dd HH:mm:ss") or eventDate.format('dd-m-yy'); 
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
       map.fitBounds(geojsonExtent(features))
     //map.flyTo({center: centerPoints(features), zoom:3}) //fly to center of points layer - still work in progress. Current issue - 

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
  // console.log(`${features1}, ${features2}`)
    map.flyTo({center:[features1, features2], zoom:9})
    
}

//function to generate center point for a layer generated from features object
function centerPoints (features){
    var latSum = 0 //latitude sum
    var longSum = 0 //longitude sum
    var pointSum = 0 //number of points
    var newLat = 0 //latitude averaged over point layer
    var newLong = 0 //longitude averaged over point layer
    var layerCenter = [] //array to hold new coordinates for center of points layer 

    features.forEach(function(feature){
        latSum += feature.geometry.coordinates[1]
        longSum += feature.geometry.coordinates[0]
        pointSum += 1
    })
    newLat = (latSum/pointSum)
    newLong = (longSum/pointSum)
    layerCenter.push(newLong)
    layerCenter.push(newLat)

    return layerCenter
}

function renderConcerts (features){
    var concertsRender = []
   features.forEach(function(feature){
       if (!feature.properties.region){
       concertsRender += `<ul>
                <ls><b> Date:</b> ${feature.properties.eventDate}</ls>
                <ls><b> Location:</b> ${feature.properties.city}, ${feature.properties.country} </ls>
                <ls><button type="button" class ="btn-sm"><a href='${feature.properties.description}' target='blank'>Get Tickets</a></button></ls>
                <ls><button type="button" class ="btn-sm" onclick=offMapZoom(${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]})>Zoom to</button><ls>

            </ul>`
       }

       else{
       concertsRender += `<ul>
                <ls><b> Date:</b> ${feature.properties.eventDate}</ls>
                <ls><b> Location:</b> ${feature.properties.city}, ${feature.properties.region}, ${feature.properties.country} </ls>
                <ls><button type="button" class ="btn-sm"><a href='${feature.properties.description}' target='blank'>Get Tickets</a></button></ls>
                <ls><button type="button" class ="btn-sm" onclick=offMapZoom(${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]})>Zoom to</button><ls>

            </ul>`
       }

   })
   
   return concertsRender
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
// })