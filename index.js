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
  buttonDiv.innerHTML = ` <button onClick="petByCategory('${category.category}', this)" class="activeBtn btn btn-outline px-8 py-10 w-full ">${category.category}
  <img class="w-1/2" src="${category.category_icon}"/></button> `
  categoryContainer.appendChild(buttonDiv)
  });
  
};

let allPets = []

// fetch data with category

const petByCategory = async(petName, button) => {
  showSpinner()
    const url = `https://openapi.programming-hero.com/api/peddy/category/${petName}`
    const res = await fetch(url)
    const data = await res.json()
    displayAllPets(data.data , petName)
   
    // remove and add active color from all elements
     addAndremoveActiveColor(button,'activeBtn')
  }
  
    // remove active color function from all elements
  
    
   



// fetch all pets data
const fetchAllPets = async () => {
  showSpinner()
    const url = 'https://openapi.programming-hero.com/api/peddy/pets'
    const res = await fetch(url)
    const data = await res.json()
     allPets = data.pets
    displayAllPets(data.pets)
     sortedPets(allPets)
}

//   display all pets
 const displayAllPets = (pets,petName) => {
   const allPetsCards = document.getElementById('allPetsCards')
   allPetsCards.innerHTML = ''
      if(pets.length === 0 && petName){
    allPetsCards.innerHTML = `<div class="w-full text-center rounded-lg shadow-lg py-12 ">
   <img class="block mx-auto" src = "images/error.webp"/>
   
    <h1 class="font-bold text-xl text-center "> ${petName}'s Information are not Available!</h1>
    <p class="w-1/2 text-sm mx-auto mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
     its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>`
    allPetsCards.classList.remove('grid')
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
      <button onClick="likedPets('${pet.image}', this)"class="active-btn badge badge-outline"><i  class="fa-solid fa-thumbs-up"></i></button>
      <button onclick="my_adopt_modal.showModal()" class="adopt-btn btn badge badge-outline">Adopt</button>
     <button class="details-btn badge badge-outline" >Details</button>
  </div>
</div>
    `
    allPetsCards.classList.add('grid')
   
    allPetsCards.appendChild(card)
    const adoptBtn = card.querySelector('.adopt-btn')
    adoptBtn.addEventListener('click', (e) => {
    
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
    e.currentTarget.disabled = true;
    e.currentTarget.classList.add('text-gray-500');
    e.currentTarget.innerText='adopted'

      myAdoptModal.showModal()
    })
    
   
   
   const detailsBtn = card.querySelector('.details-btn');
  detailsBtn.addEventListener('click', (e) => showModal(pet, e.currentTarget));

})


  
   
 }


    
 


 const showModal =  (pet,button) =>  {
  console.log(pet)
  const  detailsModal = document.getElementById('details_modal')
  detailsModal.innerHTML = `
    <div class="modal-box">
    <img class="w-full" src = "${pet.image ?? 'No information'}"/>
      <h3 class="text-xl font-extrabold mt-2">${pet.pet_name}</h3>
    <div class="flex space-x-4 my-2">
      <div >
      <p>Breed: ${pet.breed ?? 'No information'}</p>

      <p>Gender: ${pet.gender ?? 'No information'} </p>
      <p>Bacinated status: ${pet.vaccinated_status ?? 'No information'}</p>
      </div>
      <div><p>Birth:${pet.date_of_birth ?? 'No information'}</p>
      <p>price:${pet.price ?? 'No information'} </p></div>
      </div>
      
     <p class="py-4"> 
      <h1 class = "text-lg font-bold">Details Information</h1>
       ${pet.pet_details ?? 'No information'}
       </p>
      <div class="modal-action w-full bg-[#E6F1F2] text-center rounded-lg py-3">
        <form method="dialog" class="text-center mx-auto">
          <button class="text-center">cancel</button>
        </form>
      </div>
    </div>`;
    addAndremoveActiveColor(button,'details-btn')
  detailsModal.showModal();
  
}

const likedPets = (petImg,button) => {
  const likedPetContainer = document.getElementById('likedPetsContainer')
  
  // use unique indentifier for each liked pet
  const petKey = petImg
  
  // cheack if pet is already liked
  const existing = likedPetContainer.querySelector(`[data-pet="${petKey}"]`)
  console.log(existing)

  if(existing){
     // If already liked, remove the image and active styles
     likedPetContainer.removeChild(existing)
     button.classList.remove('bg-blue-500', 'text-white')
     button.querySelector('i')?.classList.replace('fa-heart', 'fa-thumbs-up')
  }
  else{
    // If not liked yet, add the pet and update button style
    const createDiv = document.createElement('div');
    createDiv.setAttribute('data-pet', petKey)
    console.log(petKey)
    createDiv.classList.add('p-4')
    createDiv.innerHTML = `<img src="${petImg}" class=" rounded-lg " />`;
    likedPetContainer.appendChild(createDiv);
     button.classList.add('bg-blue-500', 'text-white');
    button.querySelector('i')?.classList.replace('fa-thumbs-up', 'fa-heart');
  }
}



 

// function for add active color and remove active color from all buttons

  const addAndremoveActiveColor = (clickBtn, btnClass) => {
    console.log(clickBtn, btnClass)
   const allButtons = document.querySelectorAll(`.${btnClass}`)
   allButtons.forEach(b => b.classList.remove('bg-blue-500','text-white', 'rounded-lg'))
   clickBtn.classList.add('bg-blue-500','text-white', 'rounded-lg')
  }



  //  sorted by price
  const sortedPets = (allPets) => {
    console.log(allPets.price)
    const sortBtn =  document.getElementById('sortBtn')
    sortBtn.addEventListener('click', ()=>{
    const sorted = [...allPets].sort((a,b)=> a.price-b.price)
     displayAllPets(sorted)
  
  })

   }
 
//  add loading
const showSpinner = () => {
  const spinnerId = document.getElementById('spinner');
  spinnerId.classList.remove('hidden');
  setTimeout(() => {
    spinnerId.classList.add('hidden');
  }, 4000);
};




fetchAllPets()
 

fetchPetCategories()
