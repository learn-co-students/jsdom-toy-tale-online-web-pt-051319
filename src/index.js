let addToy = false;

document.addEventListener("DOMContentLoaded", function() {
  fetchToys();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.querySelectorAll(".input-text");
        createToy(input);
      });
    } else {
      toyForm.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      const toyArray = data.map(function(toy) {
        return renderToy(toy);
      });
    });
}

function renderToy(toy) {
  const toyCollection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.className = "card";

  toyCollection.append(card);

  const h2 = document.createElement("h2");
  h2.innerText = toy.name;

  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";

  const likeBtn = document.createElement("button");
  likeBtn.innerText = "Like";
  likeBtn.className = "like-btn";

  card.append(h2, img, p, likeBtn);
}

function createToy(input) {
  const newToy = {
    name: input[0].value,
    image: input[1].value,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(newToy)
  }).then(function(response) {
    return response.json().then(function(data) {
      console.log(data);
    });
  });
}

function listenLikeButtons() {
  const likeBtns = document.querySelectorAll("button.like-btn");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
      const toyId = btn.parentElement.getAttribute("toy-id");
      const toyLikes = btn.previousElementSibling.getAttribute("likes");

      addLikes(toyId, toyLikes);
    });
  });
}

function addLikes(toyId, toyLikes) {
  toyLikes++;
  const likeData = {
    likes: `${toyLikes}`
  };
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likeData)
  };
  fetch(`http://localhost:3000/toys/${toyId}`, options)
    .then(reponse => console.log(reponse))
    .then(object => console.log(object));
  document.location.reload();
}
