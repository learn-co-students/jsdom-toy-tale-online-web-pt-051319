<div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>


function addPokemon(trainerId) {
  console.log(`${trainerId}`)
  const trainerData = {
    trainer_id: `${trainerId}`
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trainerData)
  };
  // debugger;
  fetch(POKEMONS_URL, options)
    .then(response => console.log(response))
    .then(object => console.log(object));
    document.location.reload();
    // loadPokemon(TRAINERS_URL);
};

ar nameInput = document.getElementById('name');

document.querySelector('form.pure-form').addEventListener('submit', function (e) {
<!-- 
    //prevent the normal submission of the form
    e.preventDefault();

    console.log(nameInput.value);     -->
});