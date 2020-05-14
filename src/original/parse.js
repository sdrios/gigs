function parseBITData(artist) {

     return axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=234e5ea75754d065ee8978bfc59ead7d&date=upcoming").then(function (axiosresponse) {
        // response = axiosresponse
        return axiosresponse.data.map(obj => ({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(obj.venue.longitude), parseFloat(obj.venue.latitude)]
            },
            "properties": {
                "title": obj.venue.name,
                "icon": "music",
                "description": obj.offers[0].url,
                "artist": obj.artist,
                "eventDate": obj.datetime,
                "country": obj.venue.country,
                "city": obj.venue.city,
                "region": obj.venue.region

            }

        }))
    })
}

    
    // let objArray = []
    // let obj = {
    //     "type": "Feature",
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": []
    //     },
    //     "properties": {
    //         "title": "",
    //         "icon": "monument",
    //         "description": ""
    //     }
    // }

    // for (r in response) {
    //     obj.geometry.coordinates.push(response[r].venue.latitude)
    //     obj.geometry.coordinates.push(response[r].venue.longitude)
    //     obj.properties.title = (response[r].venue.name)
    //     obj.properties.description = `<a href=${(response[r].offers[0].url)}>Get your Tickets Here!</a>`
    //     objArray.push(obj)
    //     obj = {
    //         "type": "Feature",
    //         "geometry": {
    //             "type": "Point",
    //             "coordinates": []
    //         },
    //         "properties": {
    //             "title": "",
    //             "icon": "monument",
    //             "description": ""
    //         }
    //     }
    // }

    // return objArray
    // return response.map(obj => ({
    //     "type": "Feature",
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": [obj.venue.latitude, obj.venue.longitude]
    //     },
    //     "properties": {
    //         "title": obj.venue.name,
    //         "icon": "monument",
    //         "description": obj.offers[0].url
    //     }
    // }))
//}
//console.log(parseBITData('fosterthepeople'))

//  return response.map(obj => ({
//     "type": "Feature",
//     "geometry": {
//         "type": "Point",
//         "coordinates": [obj.venue.latitude, obj.venue.longitude]
//     },
//     "properties": {
//         "title": obj.venue.name,
//         "icon": "monument",
//         "description": obj.offers[0].url
//     }
// }))