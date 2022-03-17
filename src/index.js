//console.log('%c HI', 'color: firebrick')

let breeds = []

//making a function that does a fetch request to the URL. An HTTP 'get' request.
function fetchBreeds() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(resp => resp.json()) //this parses it to json. We parse the string we get to a json object. 
    // .then(resp => console.log("resp", resp)) //console.log the response to see what we get back and see what it looks like. 
    // to access the array with the key message. Below
    // .then(resp => console.log("resp", resp.message)) // this gets our array. old one. New one below

    .then(resp => {
        // console.log("resp", resp.message)
        const dogImgContainer = document.getElementById("dog-image-container") // selecting the id where we will put the images and saving it to a variable
        // we need to iterate over the array and add it to the DOM
        // we want to take the image URLs and add them to an image tag by iterating over them.
        resp.message.forEach(url => {                   // resp.message is the URLs. w
            const img = document.createElement("img")   // we forEach over them, create an img element.
            img.src = url
            dogImgContainer.append(img)                 // We append the images to the newly created image tag
        })
    })
}

function getBreedNames() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(resp => {
        breeds = Object.keys(resp.message) // we grabbed all of the key names, and shoved them into an array that we can iterate over. This also reassigns our orignal breeds empty obj
        // console.log("breeds", breeds)
        addBreedNamesToDom(breeds) // this one is taking the original breeds that we got from our fetch request
    })
}

// This function responds to the change event listener down below. makes a new li in the ul with the updated names we selected. 
function addBreedNamesToDom(breeds) {
    const ul = document.getElementById("dog-breeds")
    breeds.map(breed => {
        const li = document.createElement("li")
        li.textContent = breed
        ul.append(li)
    })
}

// make an event listener, that when you click on one of the breed names, you change the color. 
document.addEventListener("click", event => {
    if(event.target.matches("li")) {   // the breeds are stored inside a li. 
        event.target.style.color = "red"
    }
})

// this is the dropdown event. 
document.addEventListener("change", event => {
    if(event.target.matches("#breed-dropdown")) {
        const ul = document.querySelector("#dog-breeds")
        ul.innerHTML = ""           // resetting the ul back to an empty string so that we don''t have the old string of all of the names and the list we select. 
        const filteredBreeds = breeds.filter(breed => breed[0] === event.target.value)
        addBreedNamesToDom(filteredBreeds) // we pass in the updated version after we have cleared out the ul above. 
    }
})

fetchBreeds()
getBreedNames()