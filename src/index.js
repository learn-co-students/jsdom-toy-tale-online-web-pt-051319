const toysDb = "http://localhost:3000/toys"
let addToy = false

document.addEventListener('DOMContentLoaded', ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  // hide & seek with the form
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", postToy);
    } else {
      toyForm.style.display = 'none'
    }
  })
})

fetchAndysToys().then(toys => {
  toys.forEach(toy => {
    toyInfoCard(toy)
  })
})

function fetchAndysToys() {
  return fetch(toysDb)
    .then(resp => resp.json())
}

function toyInfoCard(toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement ('p')
  const button = document.createElement('button')
  const divCard = document.createElement("div");
  
  h2.innerHTML = toy.name
  img.src = toy.image
  img.setAttribute('class', 'toy-avatar')
  p.innerHTML = `${toy.likes} likes`
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.innerHTML = '&hearts;'
  button.addEventListener('click', increaseToysLikes)
  
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p, button)
  toyCollection.appendChild(divCard)
}

function postToy(event) {
  event.preventDefault();
  
  let name = document.querySelector('input[name="name"]').value;
  let image = document.querySelector('input[name="image"]').value;
  let newToyData = { name: name, image: image, likes: 0}

  return fetch(toysDb, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyData)
  })

  .then(res => res.json())
  .then(toy => toyInfoCard(toy))
  .catch(error => appendToDom(error.message));
}

function increaseToysLikes(event) {
  let increaseLike = parseInt(event.target.previousElementSibling.innerText) + 1
  
  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": increaseLike
    })
  })

  .then(res => res.json())
  .then(like => (event.target.previousElementSibling.innerText = `${increaseLike} likes`))
  .catch(error => appendToDom(error.message));
}

