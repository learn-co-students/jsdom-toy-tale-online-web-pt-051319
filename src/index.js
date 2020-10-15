let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
    toyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const toyName = event.target.name.value;
      const toyImage = event.target.image.value;
      addNewToy(toyName, toyImage);
    });
  });
});
function fetchToys() {
  fetch("http://localhost:3000/toys", {
    method: "GET",
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const container = document.getElementById("toy-collection");
      const htmlArray = data.map(function (toy) {
        return renderSingleToy(toy);
      });
      const joinedArray = htmlArray.join(" ");
      container.innerHTML = joinedArray;
    });
}
function renderSingleToy(toy) {
  return `
    <div class="card" >
      <h2>${toy.name}</h2>
      <img src= "${toy.image}" class="toy-avatar" />
      <p>${toy.likes} likes </p>
      <button class="like-btn" onClick="increaseLikes()" id ="${toy.id}">
      Like <3
      </button>
    </div>`;
}

function addNewToy(name, image) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const container = document.getElementById("toy-collection");
      container.innerHTML = renderSingleToy(data) + container.innerHTML;
    });
}

function increaseLikes() {
  let totalLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  let id = parseInt(event.target.id);
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: totalLikes,
    }),
  })
    .then((res) => res.json())
    .then(
      (event.target.previousElementSibling.innerText = `${totalLikes} likes`)
    );
}
