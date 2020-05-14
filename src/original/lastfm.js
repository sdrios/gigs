// API KEY: bfcd6e4d267ea97f4a0f00eaac61320f
async function fetchSimilarArtist(artist) {
    let response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=bfcd6e4d267ea97f4a0f00eaac61320f&format=json`)
    responseObject = await response.json()
    let sim = (responseObject.similarartists.artist.length)
    randomIndex = Math.floor(Math.random() * sim);
    return (responseObject.similarartists.artist[randomIndex].name)
}