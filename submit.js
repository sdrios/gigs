$("#submit-button").on("click", function(e){
e.preventDefault()
console.log("HI")
searchResults = `<p>test</p>`
$('.results').append(searchResults)
})