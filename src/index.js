let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  });

  //display all toys
  fetchToys();

  //add a new toy
  toyForm.addEventListener("submit", addNewToy);

  //like a toy
  document.addEventListener("click", addLike);
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let toyDiv = document.getElementById("toy-collection");
      object.forEach(function(toy) {
        renderToyCard(toy, toyDiv);
      });
    });
}

function renderToyCard(toy, div) {
  let card = document.createElement("div");
  card.className = "card";
  card.id = toy.id;

  let title = document.createElement("h2");
  title.innerText = toy.name;
  card.appendChild(title);

  let img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  card.appendChild(img);

  let likes = document.createElement("p");
  likes.innerText = toy.likes + " Likes";
  card.appendChild(likes);

  let likeBtn = document.createElement("button");
  likeBtn.className = "like-btn";
  likeBtn.innerText = "Like";
  card.appendChild(likeBtn);

  div.appendChild(card);
}

function addNewToy() {
  event.preventDefault();

  const name = document.getElementById("toy-name").value;
  const img = document.getElementById("toy-image").value;
  const toyDiv = document.getElementById("toy-collection");

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
    })
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      renderToyCard(object, toyDiv);
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
    });
}

function addLike() {
  if (event.target.className == "like-btn") {
    const id = event.target.parentElement.id;
    const card = document.getElementById(id);
    const like = card.getElementsByTagName("p")[0];
    const likeCount = parseInt(like.innerText.split(" ")[0]) + 1;
    like.innerText = `${likeCount} likes`;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {});
  }
}
