export class ContactTemplateController {
  constructor(){
    this.cardView = document.getElementById('cards-list');
    this.cardsIcon = document.getElementById('cards-icon');
    this.iconsForm = document.getElementById('icons-form');
    this.submitButton = document.getElementById('submit-button');
    this.submitEditButton = document.getElementById('submit-edit-button');
    this.newData = document.getElementById('new-data');
    this.editedData = document.getElementById('edit-data');
    this.modalActive = document.querySelector('.modal');
    this.modalEdit = document.querySelector('.modal-edit');
    this.modalPost = document.querySelector('.modal-post-user');
    this.modalDelete = document.querySelector('.modal-delete');
    this.modalSendDataButton = document.querySelector('#modal-send-data-button');
    this.modalCancelSendDataButton = document.querySelector('#modal-cancel-send-data-button');
    this.editUserOption = document.querySelector('#edit-user-option');
    this.deleteUserOption = document.querySelector('#delete-user-option');
    this.modalDeleteContactButton = document.querySelector('#modal-delete-contact-button');
    this.modalCancelDeleteContactButton = document.querySelector('#modal-cancel-delete-contact-button');
    this.loadListeners();
  };

  loadListeners(){
    this.submitButton.addEventListener('click', event => {
      event.preventDefault()
  
      if(
          this.newData.name.value == "" ||
          this.newData.email.value == "" ||
          this.newData.location.value == ""
      ){
          alert('Por favor, llene todos los campos antes de enviar')
      } else {
          this.modalActive.classList.add('active');
          this.modalPost.classList.add('active');
      };
  
    });

    this.modalCancelSendDataButton.addEventListener('click', () => {
      this.disableModal();
    });

    this.modalActive.addEventListener('click', event => {
      if(event.target === event.currentTarget){
          this.modalActive.classList.remove('active');
          this.modalEdit.classList.remove('active');
          this.modalDelete.classList.remove('active');
          this.modalPost.classList.remove('active');
      };
  });
  }

  getNewContactFormData(){
    const name = this.newData.name.value;
    const email = this.newData.email.value;
    const ubication = this.newData.location.value;

    return { name, email, ubication };
  }

  getEditContactFormData(){
    const name = this.editedData.name.value;
    const email = this.editedData.email.value;
    const ubication = this.editedData.location.value;

    return { name, email, ubication };
  }

  disableModal(){
    this.modalActive.classList.remove('active');
    this.modalEdit.classList.remove('active');
    this.modalDelete.classList.remove('active');
    this.modalPost.classList.remove('active');
  }

  clearNewContactForm(){
    this.newData.name.value = "";
    this.newData.email.value = "";
    this.newData.location.value = "";
  }

  setEditContactForm({ name = '', email = '', ubication = '' }){
    this.editedData.name.value = name;
    this.editedData.email.value = email;
    this.editedData.location.value = ubication;
  }

  updateCardClicked(id = 0 || ''){
    const cards = document.querySelectorAll(".icons-input");
    for(let i = 0; i < cards.length; i++){
        if(cards[i].value == id){
            cards[i].click();
        };
    };
  }

  updateCardView(user){
    this.cardView.innerHTML = `
      <div class='card'> 
        <div class="card-inner">
            <h2 class="text-info">${user.name} </h2>
            <p class="text-info"> ${user.email}</p>
            <p class="text-info"> ${user.ubication}</p>
        </div>
        <div class="card-inner">
            <img class="img-contact" src="https://cdn3.iconfinder.com/data/icons/communication/512/contact_A-512.png" alt="">
        </div>
      </div>
    `;
  }

  printIcons(list){
    this.iconsForm.innerHTML = '';
    for(let user of list.contactList){
      this.iconsForm.innerHTML += 
       `
        <label class='icon' for="icon${user.id}">
            <h4 class="text-info">${user.name} </h4>
        </label>
        <input class="icons-input" type="radio" name="formIcons" id="icon${user.id}" value="${user.id}">
       `;
   }
  }
  
  setCardCustomEventHandler(handler){
    const cards = document.querySelectorAll(".icons-input");
    for(const card of cards){
      card.addEventListener("change", handler);
    };
  }

  enableEditFormModal(){
    this.modalActive.classList.add('active');
    this.modalEdit.classList.add('active');
  }

  enableDeleteFormModal(){
    this.modalActive.classList.add('active');
    this.modalDelete.classList.add('active');
  }
}
