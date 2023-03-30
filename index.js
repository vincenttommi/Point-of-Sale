
fetch("http://localhost:3000/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const characters = document.querySelector('.details');

    data.forEach(function (product) {
      
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${product.image}" alt="Product Image" style="width:50%; height:50%">
        <div class="container">
          <h3><b>${product.name}</b></h3>
          <p>${product.description}</p>
          <p>${product.price}</p>
          <div class="card-actions">
            <button class="edit-button" style="background-color: #9FE2BF; color: green; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
            <button class="delete-button" style="background-color: #FA8072; color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
          </div>
        </div>
      `;
      characters.appendChild(card);

      
      const editButton = card.querySelector('.edit-button');
      const deleteButton = card.querySelector('.delete-button');
      
      deleteButton.addEventListener('click',() =>{
        card.remove()
        console.log(product.id)
        deleteProduct(product.id)
      });
      
      editButton.addEventListener('click', () => {
        
        console.log('Edit clicked for product', product.id);
      });
    });
  });
  
  function deleteProduct(id){
    fetch(`http://localhost:3000/products/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json)
    .then(product =>console.log(product))
  }
  

// Get the reference to the form and attach an event listener for form submit
const form = document.querySelector('#productForm');
form.addEventListener('submit', handleSubmit);

// Define the function that will be called when the form is submitted
function handleSubmit(e) {
  e.preventDefault();
  let productObj = {
    name: e.target.name.value,
    image: e.target.image_url.value,
    description: e.target.description.value,
    price: e.target.price.value // Fixed typo here, should be price
  }

  console.log(productObj)
  addProduct(productObj);
}


function addProduct(productObj) {
  fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productObj)
  })
  .then(res => res.json
())
    .then(product => console.log(product))
    .catch(err => console.error(err)); 
  }











