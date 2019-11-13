var searchText = ''

$("#search-bar").on("input", function(e){
searchText = e.target.value.toLowerCase().split(' ').join('')
console.log(searchText)
})

$("#submit-button").on("click", function(e){
e.preventDefault()

searchResults = `<p>${searchText}</p>`
$('.results').append(searchResults)
})