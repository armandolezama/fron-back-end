export class ContactsHTMLElements {
  constructor(url = ''){
    this.cardsList = document.getElementById('cards-list');
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
    this.url = url;

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
      }
  
    });

    this.submitEditButton.addEventListener('click', event => {
      event.preventDefault()
      let edited = {};
      edited.name = this.editedData.name.value;
      edited.email = this.editedData.email.value;
      edited.ubication = this.editedData.location.value;
  
      if(
          this.editedData.name.value == "" ||
          this.editedData.email.value == "" ||
          this.editedData.location.value == ""
      ){
          alert('Por favor, llene los campos antes de enviar la actualización')
      } else {
          const putData = {
              method: 'put',
              body: JSON.stringify(edited),
              headers:{
                  'Content-Type': 'application/json'
                }
          }
      
          let id = this.iconsForm.formIcons.value;
          console.log(id)
          fetch(`${url}/${id}`, putData)
              .then(response => response.json()
              )
          .then(responseJson => {
              this.printIcons(responseJson);
              const cards = document.querySelectorAll(".icons-input");
              console.log(id)
              for(let i = 0; i < cards.length; i++){
                  console.log(cards[i].value == id)
                  if(cards[i].value == id){
                      cards[i].click();
                  }
      
                  this.modalActive.classList.remove('active');
                  this.modalEdit.classList.remove('active');
              }
          }
          ).catch(error => console.error('Error:', error));
      }
  
    });

    this.modalActive.addEventListener('click', function(event){
        if(event.target !== event.currentTarget){
            modalActive.classList.remove('active');
            modalEdit.classList.remove('active');
            modalDelete.classList.remove('active');
            modalPost.classList.remove('active');
        }
    });
  }

  rendercontacts(){}

  retrieveDataFromForm(){
    const name = this.editedData.name.value;
    const email = this.editedData.email.value;
    const location = this.editedData.location.value;

    return {
      name, email, location
    }
  }

  sendData() {

    const newName = this.newData.name.value;
    const newEmail = this.newData.email.value;
    const newLocation = this.newData.location.value;

    const putData = {
        method: 'post',
        body: JSON.stringify(
            { 
                name: newName,
                email: newEmail,
                ubication: newLocation
            }
        ),
        headers:{
            'Content-Type': 'application/json'
          }
    }
    fetch(this.url, putData)
        .then(response => response.json()
        )
    .then(responseJson => {
        this.printIcons(responseJson);
    }
    ).catch(error => console.error('Error:', error));
    this.modalActive.classList.remove('active');
    this.modalPost.classList.remove('active');
    this.newData.name.value = "";
    this.newData.email.value = "";
    this.newData.location.value = "";
  }

  noSendData(){
    this.modalActive.classList.remove('active');
    this.modalPost.classList.remove('active');
  }

  async getContacts(){
    const getData = {
        method: 'get'
    };

    const result = await fetch(this.url, getData);
    const parsedResult = await result.json()
    this.printIcons(parsedResult);
  }

  printIcons(list){
    let cardsIcons = '';
    for(let user of list.contactList){
       cardsIcons += 
        `
            <label class='icon' for="icon${user.id}">
                <h4 class="text-info">${user.name} </h4>
            </label>
            <input class="icons-input" type="radio" name="formIcons" id="icon${user.id}" value="${user.id}">
        `;
    }

    this.iconsForm.innerHTML = cardsIcons;

    const cards = document.querySelectorAll(".icons-input");

    for(let card of cards){
        card.addEventListener("change", () => {
            const getData = {
                method: 'get'
            };
            let id = this.iconsForm.formIcons.value;
            fetch(`${this.url}/${id}`, getData).then(response => {
                console.log(response);
                return response.json();
            }).then(user => {
              this.cardsList.innerHTML = `
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
                `
            });
            
        });
    }

  }

  editUser() {

    if(iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto');
    } else {
        this.modalActive.classList.add('active');
        this.modalEdit.classList.add('active');
        let id = iconsForm.formIcons.value;
        const getData = {method: 'get'};
        fetch(`${this.url}/${id}`, getData).then(response => {
            console.log(response);
            return response.json();
        }).then(user => {
            this.editedData.name.value = user.name;
            this.editedData.email.value = user.email;
            this.editedData.location.value = user.ubication;
        });

    }
}

  deletUser(){
    if(iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto')
    } else {
        this.modalActive.classList.add('active');
        this.modalDelete.classList.add('active');
    }
}

  delContact() {
    const delData = {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json'
          }
    }

    let id = iconsForm.formIcons.value;
    fetch(`${this.url}/${id}`, delData).then(response => {
        return response.json();
    }).then(responseJson => {
        this.printIcons(responseJson);
        this.cardsList.innerHTML = "";
        this.modalActive.classList.remove('active');
        this.modalDelete.classList.remove('active');
    })
};

  cancelDel() {
    this.modalActive.classList.remove('active');
    this.modalDelete.classList.remove('active');
};
}