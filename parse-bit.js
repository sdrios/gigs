// Example 
// bitresponse = [
//     {
//         "id": "1017460341",
//         "url": "https://www.bandsintown.com/e/1017460341?app_id=234e5ea75754d065ee8978bfc59ead7d&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
//         "datetime": "2019-11-23T19:00:00",
//         "description": "An absolute corker",
//         "artist": {
//             "id": "2265132",
//             "name": "Crooked Colours",
//             "url": "https://www.bandsintown.com/a/2265132?came_from=267&app_id=234e5ea75754d065ee8978bfc59ead7d",
//             "mbid": "",
//             "options": {
//                 "display_listen_unit": false
//             },
//             "image_url": "https://s3.amazonaws.com/bit-photos/large/8811694.jpeg",
//             "thumb_url": "https://s3.amazonaws.com/bit-photos/thumb/8811694.jpeg",
//             "facebook_page_url": "http://www.facebook.com/271800989531358",
//             "tracker_count": 29210,
//             "upcoming_event_count": 8
//         },
//         "venue": {
//             "country": "Australia",
//             "city": "Victoria Park",
//             "latitude": "-21.15",
//             "name": "Grapevine Estate",
//             "region": "",
//             "longitude": "149.2"
//         },
//         "lineup": [
//             "Crooked Colours"
//         ],
//         "offers": [
//             {
//                 "type": "Tickets",
//                 "url": "https://www.bandsintown.com/t/1017460341?app_id=234e5ea75754d065ee8978bfc59ead7d&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
//                 "status": "available"
//             }
//         ],
//         "artist_id": "2265132",
//         "on_sale_datetime": ""
//     },
//     {
//         "id": "1017460442",
//         "url": "https://www.bandsintown.com/e/1017460442?app_id=234e5ea75754d065ee8978bfc59ead7d&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
//         "datetime": "2019-11-30T19:00:00",
//         "description": "Full-bodied partying",
//         "venue": {
//             "country": "Australia",
//             "city": "Pokolbin",
//             "latitude": "-32.8",
//             "name": "Roche Estate",
//             "region": "",
//             "longitude": "151.2833333"
//         },
//         "lineup": [
//             "Crooked Colours"
//         ],
//         "offers": [
//             {
//                 "type": "Tickets",
//                 "url": "https://www.bandsintown.com/t/1017460442?app_id=234e5ea75754d065ee8978bfc59ead7d&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
//                 "status": "available"
//             }
//         ],
//         "artist_id": "2265132",
//         "on_sale_datetime": ""
//     }
// ]

function parseBITData(artist) {
    // let response
    return axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=234e5ea75754d065ee8978bfc59ead7d&date=upcoming").then(function (axiosresponse) {
        // response = axiosresponse
        return axiosresponse.data.map(obj => ({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [obj.venue.latitude, obj.venue.longitude]
            },
            "properties": {
                "title": obj.venue.name,
                "icon": "monument",
                "description": obj.offers[0].url
            }
        }))
    })
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
}
// console.log(parseBITData('fosterthepeople'))

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