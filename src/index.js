let addToy = false
const TOYS_URL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", ()=>{
  loadToys(TOYS_URL);
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  const input = document.querySelectorAll('input.input-text')
  toyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formValues = []
    input.forEach(val => {
      formValues.push(val.value)
    })
    newToy(formValues);
  })
})

function newToy(formValues) {
  const toyData = {
    name: `${formValues[0]}`,
    image: `${formValues[1]}`
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };
  fetch(TOYS_URL, options)
    .then(response => console.log(response))
    .then(object => console.log(object));
    document.location.reload();
};

function loadToys(TOYS_URL) {
  fetch(TOYS_URL)
    .then(res => res.json())
    .then(json => renderToys(json));
}

function renderToys(json) {
  const toyCollection = document.getElementById("toy-collection")
  json.forEach(toy => {
    const card = document.createElement("div")
    card.classList.add("card")
    toyCollection.appendChild(card)
    h2 = document.createElement("h2")
    h2.innerHTML = `<h2>${toy.name}</h2>`
    card.appendChild(h2)
    img = document.createElement("img")
    img.classList.add("toy-avatar")
    img.setAttribute("src", `${toy.image}`)
    card.appendChild(img)
    p = document.createElement("p")
    p.innerHTML = `<p>${toy.likes} Likes </p>`
    card.appendChild(p)
    btn = document.createElement("button")
    btn.classList.add("like-btn")
    btn.innerHTML = "<button> Like <3 </button>"
    card.appendChild(btn)
  })
}



// function newToy(name, img) {
//   console.log(`${name}`)
//   console.log(`${img}`)

// }
