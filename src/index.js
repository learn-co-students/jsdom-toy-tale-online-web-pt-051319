let addToy = false

// gathering all toy data from db then sending each to toyData func.
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => {
      return json.forEach((toy) => {
        toyData(toy);
      });
    }
    )
}

// creating new elements based off toy data and appending them to document via their own "card" container
function toyData(toy) {
  // grabbing the div where we will add each toys card
  let toyContainer = document.getElementById("toy-collection")

  let toyCard = document.createElement('div')
  toyCard.className = "card"

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  let bttn = document.createElement('button')
  bttn.className = "like-btn"
  bttn.id = toy.id
  bttn.innerText = "like"
  // adding an event for when someone 'likes' a toy 
  bttn.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    toyLikes(event)
  })

  toyCard.append(h2, img, p, bttn)
  toyContainer.appendChild(toyCard)

}





// send a post req to the same page w fetch, then send toy to toyData to get added to the page
function postNewToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
    .then(resp => resp.json())
    .then((t) => {
      toyData(t)
    })
}


function toyLikes(event) {
  // prevent reload on click event
  event.preventDefault()
  let addToCount = parseInt(event.target.parentElement.querySelector('p').innerHTML) + 1;

  fetch(`http://localhost:3000/toys/${event['id']}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": addToCount
    })
  })
    .then(resp => resp.json())
    .then((t) => {
      event.target.parentElement.querySelector('p').innerHTML = `${addToCount} likes`;
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  fetchToys()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', (e) => {
        e.preventDefault()
        postNewToy(e.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
  console.log('Fetch all available toys now that DOM is loaded');

})