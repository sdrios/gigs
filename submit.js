var searchText = ''
var clickCounter = 0
var currentArtist = ''
 
$("#search-bar").on("input", function(e){
searchText = e.target.value
searchTextJoin = e.target.value.toLowerCase().split(' ').join('')
})

$("#submit-button").on("click", async function(e){
    e.preventDefault()
    clickCounter += 1
    console.log(clickCounter)
    let features = await parseBITData(searchTextJoin) 
    
     $('.results').html(
        `<ul>
            <ls><b> Artist name:</b> ${features[0].properties.artist.name} </ls>
        </ul>`)

        //   <ls><b> Facebook page:</b><a href=> ${features[0].properties.artist.facebook_page_url}</a></ls>
        
        
       
        
        
    for(var i = 0; i< features.length;i++){
        console.log(features[i]);
        //console.log(typeof features[i].properties.eventDate)
        var myDate = moment(features[i].properties.eventDate)
        //console.log(myDate)
        myDate.format("MMMM Do YYYY, h:mm:ss a'")
        var dateFormat = myDate.format("MMMM Do YYYY, h:mm:ss a")
        //console.log(myDate.format("MMMM Do YYYY, h:mm:ss a'"))
        $('.results').append(
            
            `<ul>
                <ls><b> Date:</b> ${dateFormat}     
                </ls>
                <ls><b> Venue:</b> ${features[i].properties.title}</ls>
                <ls><button type="button" class ="btn-sm"><a href='${features[i].properties.description}' target='blank'>Get Tickets</a></button></ls>
                <ls><button type="button" class ="btn-sm" onclick=offMapZoom(${features[i].geometry.coordinates[0]},${features[i].geometry.coordinates[1]})>Zoom to</button><ls>

            </ul>`
        )
        
                
    }
    
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