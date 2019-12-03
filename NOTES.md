<div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>


function renderTrainers(json) {
  const main = document.querySelector('main')
  json.data.forEach(trainer => {
    const card = document.createElement("div");
    card.classList.add("card")
    card.setAttribute("data-id", `${trainer.id}`)
    card.innerHTML = `<p>${trainer.attributes.name}</p>
    <button class="add" onClick=addPokemon(${trainer.id}) data-trainer-id="${trainer.id}">Add Pokemon</button>`
    main.appendChild(card)
    const ul = document.createElement("ul")
    card.appendChild(ul)
  })
}