let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
    })   
    
})

function getToys() {
  fetch("http://localhost:3000/toys") 
    .then(function(res) {
      return res.json()
    }).then(function(json) {
      parseArray(json)
    })
  
}

function parseArray(json) {
  console.log(json)
  
}


// to-do list

// fetch all toys and make cards in class "toy-collection"
// after page load make GET request to fetch all toy objects
// h2 tag with toys name
// img tag with the src of the image attr and class name "toy-avatar"
// p tag with total likes
// button tag with a class "like-btn"
// user clicks add toy. POST request is sent to http://localhost:3000/toys and toy is added
// user clicks like button. PATCH request to http://localhost:3000/toys/:id updating # of likes
