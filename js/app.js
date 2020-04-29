let galleryDiv = document.querySelector('#gallery');
let body = document.querySelector('body');
let searchContainer = document.querySelector('.search-container');

// add search feature
searchContainer.innerHTML = `
  <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`
let form = searchContainer.querySelector('form');
let searchButton = form.querySelector('#search-submit');
let textInput = form.querySelector('#search-input');

// search form event listener
searchButton.addEventListener('click', (e) => {
  let names = galleryDiv.querySelectorAll('h3');
  names.forEach(name => {
    if (!name.innerText.toLowerCase().includes(textInput.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'none';
    } else {
      name.parentElement.parentElement.style.display = 'block';
    }
    });
})

// generates 12 employees on page load
window.onload = fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json())
.then(data => {
  data.results.forEach(result => {
  buildEmployeeCard(result);
  buildEmployeeModal(result);
  })
})

// function to build card
function buildEmployeeCard(array) {
  let firstName = array.name.first;
  let lastName = array.name.last;
  let email = array.email;
  let city = array.location.city;
  let state = array.location.state;
  let img = array.picture.medium;

  galleryDiv.innerHTML += `
  <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${img}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}</p>
    </div>
  </div>
  `
}

// function to build modal
function buildEmployeeModal(array) {
  let img = array.picture.medium;
  let firstName = array.name.first;
  let lastName = array.name.last;
  let street = array.location.street;
  let city = array.location.city;
  let state = array.location.state;
  let zip = array.location.postcode;
  let cell = array.cell;
  let email = array.email;
  let birthdayData = array.dob.date;
  let birthYear = birthdayData.slice(0,4);
  let birthMonth = birthdayData.slice(5,7);
  let birthDay = birthdayData.slice(8,10);

  let modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong>
        </button>
        <div class="modal-info-container">
            <img class="modal-img" src="${img}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${cell}</p>
            <p class="modal-text">${street.number} ${street.name} ${city} ${state} ${zip}</p>
            <p class="modal-text">${birthMonth}/${birthDay}/${birthYear}</p>
        </div>
        <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
      </div>
    `
  modalListener(modalContainer);
  let buttonContainer = modalContainer.querySelector('.modal .modal-btn-container');
  modalSwitch(buttonContainer);
  modalContainer.style.display = 'none';
  body.appendChild(modalContainer);
}

// event listeners
// show modal listener

galleryDiv.addEventListener('click', (e) => {
  let cards = document.querySelectorAll('.card');
  let modals = document.querySelectorAll('.modal-container');
  if (e.target !== galleryDiv) {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].contains(e.target)) {
        modals[i].style.display = '';
      }
    }
  }
}) 
// close modal listener
function modalListener(element) {
  element.addEventListener('click', (e) => {
    let button = element.querySelector('button');
    if (button.contains(e.target)) {
      element.style.display = 'none';
    }
  });
}

function modalSwitch(element) {
  element.addEventListener('click', (e) => {
    let allButtonContainers = body.querySelector('.modal-container').querySelectorAll('.modal-btn-container');
    console.log(allButtonContainers);
    alert('test');
  })
}

// let modalButtonContainers = document.querySelectorAll('.modal-btn-container');
//   // modalButtonContainers.forEach(buttonContainer => {
//   //   buttonContainer.addEventListener('click', (e) => {
//   //     alert('test');
//   //   })
//   // })