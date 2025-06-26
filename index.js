// Fetch All Pet Categories
const fetchPetCategories = async () => {
  const url = 'https://openapi.programming-hero.com/api/peddy/categories';
  const res = await fetch(url);
  const data = await res.json();
  const categories = data.categories
 const categoryContainer = document.getElementById('category-container')
  categories.forEach(category => {
  const buttonDiv = document.createElement('div')
  buttonDiv.classList.add('w-40','mx-auto')
  buttonDiv.innerHTML = ` <button onClick="petByCategory('${category.category}')" class="btn btn-outline px-8 py-10 w-full ">${category.category}
  <img class="w-1/2" src="${category.category_icon}"/></button> `
  categoryContainer.appendChild(buttonDiv)
  });
  
};


// fetch data with category

const petByCategory = async(petName) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${petName}`
    const res = await fetch(url)
    const data = await res.json()
    displayAllPets(data.data, petName)
    // remove active color from all elements
   
  //  add active color when button click
   
  
  }
  
    // remove active color function from all elements
  
    
   



// fetch all pets data
const fetchAllPets = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/pets'
    const res = await fetch(url)
    const data = await res.json()
    displayAllPets(data.pets)
}

//   display all pets
 const displayAllPets = (pets,petName) => {
   const allPetsCards = document.getElementById('allPetsCards')
   allPetsCards.innerHTML = ''
      if(pets.length === 0 && petName){
    allPetsCards.innerHTML = `<div class=""><p class="font-bold text-lg text-center"> ${petName}s are stock out</p></div>`
   }
   pets.forEach(pet => {
  const card = document.createElement('div')
    card.innerHTML = `
        <div class="card bg-base-100 w-40 md:w-55 shadow-sm h-full">
  <figure>
    <img class=""
      src=${pet.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      ${pet.pet_name}
     </h2>
     <div>
    ${pet.breed ? `<p>Breed : ${pet.breed}</p>` : '' }
     <p>Birth : ${pet.date_of_birth}</p>
     <p>Gender : ${pet.gender}</p>
     <p>price : ${pet.price}</p>
     </div>
      <div class="card-actions mt-2 ">
      <button onClick="likedPets('${pet.image}')"class="badge badge-outline"><i  class="fa-solid fa-thumbs-up"></i></button>
      <button onclick="my_adopt_modal.showModal()" class="adopt-btn btn badge badge-outline">Adopt</button>
     <button  class="details-btn badge badge-outline" >Details</button>
  </div>
</div>
    `
    
   
    allPetsCards.appendChild(card)
    const adoptBtn = card.querySelector('.adopt-btn')
    adoptBtn.addEventListener('click', () => {
    const myAdoptModal = document.getElementById('my_adopt_modal')
     myAdoptModal.innerHTML = 
    ` 
    <div class="modal-box">
    <h3 class="text-xl font-extrabold text-center text-pink-800">Congratulations!</h3>
      <p class="py-4 text-center">${pet.pet_name} is successfully Adopted</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>`
    myAdoptModal.showModal()
    })
    
   
   
   const detailsBtn = card.querySelector('.details-btn');
  detailsBtn.addEventListener('click', () => showModal(pet));



   

    
   
   })


  
   
 }

//   function showModal (petName)  {
//   const myModal = document.getElementById('my_modal');

//   // Set up the first modal's content
//   myModal.innerHTML = `
//     <div class="modal-box">
//       <h3 class="text-xl font-extrabold text-center text-pink-800">Congratulations!</h3>
//       <p class="py-4 text-center">${petName} is successfully Adopted</p>
//     </div>
//     <form method="dialog" class="modal-backdrop">
//       <button>close</button>
//     </form>`;

//   // Set up the second modal's content
  
//   // Show the first modal
//   myModal.showModal();

 
    
 
// };

 const showModal =  (pet) =>  {
  const  detailsModal = document.getElementById('details_modal')
  detailsModal.innerHTML = `
    <div class="modal-box">
      <h3 class="text-xl font-extrabold">${pet.pet_name}</h3>
    <div class="flex space-x-4 my-2">
      <div >
      <p>Breed:${pet.breed}</p>
      <p>Gender: ${pet.gender}</p>
      <p>Bacinated status: ${pet.vaccinated_status}</p>
      </div>
      <div><p>Birth:${pet.date_of_birth}</p>
      <p>price:${pet.price} </p></div>
      </div>
      
     <p class="py-4"> 
      <h1 class = "text-lg font-bold">Details Information</h1>
       ${pet.pet_details}
       </p>
      <div class="modal-action w-full bg-[#E6F1F2] text-center rounded-lg py-3">
        <form method="dialog" class="text-center mx-auto">
          <button class="text-center">cancel</button>
        </form>
      </div>
    </div>`;
  detailsModal.showModal();
}




//  show liked pets
 const likedPets = (petImg) => {
   const likedPetContainer = document.getElementById('likedPetsContainer')
  const createDiv = document.createElement('div')
  createDiv.innerHTML= `<img src = ${petImg}/>`
  likedPetContainer.appendChild(createDiv)
 }



//  show-modal





   









  fetchAllPets()
 

fetchPetCategories()
