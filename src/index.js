let addToy = false

document.addEventListener('DOMContentLoaded', ()=>{
  getToys()
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", postToy);
    } else {
      toyForm.style.display = 'none'
    }
  })
})

function postToy(event) {
  event.preventDefault();
  let name = document.querySelector('input[name="name"]').value;
  let image = document.querySelector('input[name="image"]').value;

  let newToyData = { name: name, image: image, likes: 0}

  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyData)
  })
    .then(res => res.json())
    .then(data => createToyCard(data))
    .catch(error => appendToDom(error.message));
}

function getToys() {
    return fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(data => renderToys(data))
}

function renderToys(data) {
  for (const element of data) {
    createToyCard(element);
  }
}

function createToyCard(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const h2 = document.createElement('h2')
    h2.innerHTML = toy.name

  const img = document.createElement('img')
    img.src = toy.image
    img.setAttribute('class', 'toy-avatar')

  const p = document.createElement ('p')
    p.innerHTML = `${toy.likes} likes`
  
  const button = document.createElement('button')
    button.innerHTML = 'Like <3'
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.addEventListener('click', increaseLikes)

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  toyCollection.appendChild(card)
    .appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)

}

function increaseLikes(event) {
  let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1
    return fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
      .then(res => res.json())
      .then(
        data =>
          (event.target.previousElementSibling.innerText = `${newLikes} likes`)
      )
      .catch(error => appendToDom(error.message));
}

function appendToDom(msg) {
  let header = document.querySelector('#toy-header')
  let p = document.createElement('p')
  p.innerText = msg
  header.appendChild(p)
}