let addToy = false
let test = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyCollection = document.getElementById('toy-collection');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    showForm(toyForm);
  })

  fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(rj => listToys(rj, toyCollection));

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.name
    let image = e.target.image
    newToy(name.value, image.value, toyCollection);
    name.value = "";
    image.value = "";
    showForm(toyForm);
  });
})

document.addEventListener("click", (e) => {
  if(e.target.className == 'like-btn'){
    e.preventDefault();
    let parent = e.target.parentElement;
    likeIt(parent);
  }
})

const showForm  = (container) => {
  addToy = !addToy
    if (addToy) {
      container.style.display = 'block'
    } else {
      container.style.display = 'none'
    }
}

const listToys = (toyList, container)=> {
  toyList.forEach((toy) => {  
    let card = document.createElement('div');
    card.classList.add('card');
    let hTwo = `<h2>${toy.name}</h2>`;
    let img = `<img src=${toy.image} class="toy-avatar" />`;
    let pTag = `<p>${toy.likes} Likes</p>`;
    let button = '<button class="like-btn">Like <3</button>'
    card.innerHTML = hTwo + img + pTag + button;
    container.appendChild(card);
  })
}

const newToy = (name, image, container) => {
  fetch('http://localhost:3000/toys', postData(name, image))
    .then(r => r.json())
    .then(rj => listNewToy(rj.value, rj.value, container))
    .catch(error => console.log(error.message))
}

const listNewToy = (name, image, container) => {
  let card = document.createElement('div');
    card.classList.add('card');
    let hTwo = `<h2>${name}</h2>`;
    let img = `<img src=${image} class="toy-avatar" />`;
    let pTag = `<p>0 Likes</p>`;
    let button = '<button class="like-btn">Like <3</button>'
    card.innerHTML = hTwo + img + pTag + button;
    container.appendChild(card);
}

const postData = (name, imgUrl) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body : JSON.stringify({
      "name": name,
      "image": imgUrl,
      "likes": 0
    })
  }
}

const likeIt = (parent) => {
  let name = parent.getElementsByTagName('h2')[0].textContent
  let likesTag = parent.getElementsByTagName('p')[0]
  let likes = parseInt(likesTag.textContent.split(' ')[0]) + 1;
  // console.log(likes)
  likesTag.textContent = `${likes} Likes`
  getAllToys(name, likes)
}

const getAllToys = (name, likes) => {
  fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(rj => getToyIdByName(rj, name, likes))
}

const getToyIdByName = (list, name, likes) => {
  list.forEach(toy => {
    if(toy.name == name){
      patchDbData(toy.id, likes)
    }
  })
}

const patchDbData = (toyId, likes) => {
  const url = `http://localhost:3000/toys/${toyId}`
  fetch(url, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ "likes": likes })
  })
}