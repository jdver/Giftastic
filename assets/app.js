// create our array variable
var topics = ['game of thrones', 'how to get away with murder', 'the office', 'rupauls drag race', 'stranger things', 'silicon valley']

// Function for displaying movie data
function renderButtons () {
  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  document.querySelector('#buttons').innerHTML = ''

  // Looping through the array of movies
  for (let show of topics) {
    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = document.createElement('button')
    // *Temporarily commenting out lines 18 and 20
    a.onclick = displayGifs
    // Adding a class of movie to our button
    a.classList.add('show')
    // Adding a data-attribute
    a.setAttribute('data-name', show)
    // Providing the initial button text
    a.innerText = show
    // Adding the button to the buttons-view div
    document.querySelector('#buttons').appendChild(a)
  }
}

renderButtons()

function displayGifs () {
  if (this.classList.contains('show')) {
    var show = this.dataset.name
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
       show + '&api_key=1Y3aGj0Wkz2FtUFgu7RqH0F8uipBejeB&limit=10'

    fetch(queryURL, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        // Storing an array of results in the results variable
        var results = response.data

        // Looping over every result item
        for (let item of results) {
          // Only taking action if the photo has an appropriate rating
          if (item.rating !== 'r' && item.rating !== 'pg-13') {
            // Creating a div for the gif

            document.querySelector('#gifs-appear-here').innerHTML = ''
            var gifDiv = document.createElement('div')
            gifDiv.classList.add('gifDiv')

            // Storing the result item's rating
            var rating = item.rating

            // Creating a paragraph tag with the result item's rating
            var p = document.createElement('p')
            p.innerText = `Rating: ${rating}`

            // Creating an image tag
            var personImage = document.createElement('img')

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.setAttribute('src', item.images.fixed_height.url)
            personImage.setAttribute('data-still', item.images.fixed_height_still.url)
            personImage.setAttribute('data-animate', item.images.fixed_height.url)
            personImage.setAttribute('data-state', 'still')
            personImage.classList.add('showGifs')

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.appendChild(personImage)
            gifDiv.appendChild(p)

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            let gifsContainer = document.querySelector('#gifs-appear-here')
            gifsContainer.insertBefore(gifDiv, gifsContainer.firstChild)
          }
        }
      })
  }
}
document.querySelector('#gifs-appear-here').addEventListener('click', function (event) {
  if (event.target.tagName === 'img'.toUpperCase()) {
    let currentImg = event.target
    var state = currentImg.dataset.state
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === 'still') {
      currentImg.setAttribute('src', currentImg.dataset.animate)
      currentImg.setAttribute('data-state', 'animate')
    } else {
      currentImg.setAttribute('src', currentImg.dataset.still)
      currentImg.setAttribute('data-state', 'still')
    }
  }
})
// This function handles events where one button is clicked
document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault()

  // This line grabs the input from the textbox
  var show = document.querySelector('#show-input').value.trim()

  // Adding the movie from the textbox to our array
  topics.push(show)
  console.log(topics)

  // Calling renderButtons which handles the processing of our movie array
  renderButtons()
})
