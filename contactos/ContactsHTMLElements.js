const htmlReferencesModel = {
  cardsList: () => {},
  cardsIcon: () => {},
  iconsForm: () => {},
  submitButton: () => {},
  submitEditButton: () => {},
  newData: () => {},
  editedData: () => {},
  modalActive: () => {},
  modalEdit: () => {},
  modalPost: () => {},
  modalDelete: () => {},
}

class ContactsHTMLElements {
  constructor(htmlReferences = htmlReferencesModel, url = ''){
    this.htmlReferences = htmlReferences;
    this.url = url;

    this.htmlReferences.submitButton.addEventListener('click', event => {
      event.preventDefault()
  
      if(
          this.htmlReferences.newData.name.value == "" ||
          this.htmlReferences.newData.email.value == "" ||
          this.htmlReferences.newData.location.value == ""
      ){
          alert('Por favor, llene todos los campos antes de enviar')
      } else {
          this.htmlReferences.modalActive.classList.add('active');
          this.htmlReferences.modalPost.classList.add('active');
      }
  
    });

    this.htmlReferences.submitEditButton.addEventListener('click', event => {
      event.preventDefault()
      let edited = {};
      edited.name = this.htmlReferences.editedData.name.value;
      edited.email = this.htmlReferences.editedData.email.value;
      edited.ubication = this.htmlReferences.editedData.location.value;
  
      if(
          this.htmlReferences.editedData.name.value == "" ||
          this.htmlReferences.editedData.email.value == "" ||
          this.htmlReferences.editedData.location.value == ""
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
      
          let id = this.htmlReferences.iconsForm.formIcons.value;
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
      
                  this.htmlReferences.modalActive.classList.remove('active');
                  this.htmlReferences.modalEdit.classList.remove('active');
              }
          }
          ).catch(error => console.error('Error:', error));
      }
  
  });
  }

  rendercontacts(){}

  retrieveDataFromForm(){
    const name = this.htmlReferences.editedData.name.value;
    const email = this.htmlReferences.editedData.email.value;
    const location = this.htmlReferences.editedData.location.value;

    return {
      name, email, location
    }
  }

  sendData() {

    const newName = this.htmlReferences.newData.name.value;
    const newEmail = this.htmlReferences.newData.email.value;
    const newLocation = this.htmlReferences.newData.location.value;

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
    this.htmlReferences.modalActive.classList.remove('active');
    this.htmlReferences.modalPost.classList.remove('active');
    this.htmlReferences.newData.name.value = "";
    this.htmlReferences.newData.email.value = "";
    this.htmlReferences.newData.location.value = "";
  }

  noSendData(){
    this.htmlReferences.modalActive.classList.remove('active');
    this.htmlReferences.modalPost.classList.remove('active');
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

    this.htmlReferences.iconsForm.innerHTML = cardsIcons;

    const cards = document.querySelectorAll(".icons-input");

    for(let card of cards){
        card.addEventListener("change", () => {
            const getData = {
                method: 'get'
            };
            let id = this.htmlReferences.iconsForm.formIcons.value;
            fetch(`${this.url}/${id}`, getData).then(response => {
                console.log(response);
                return response.json();
            }).then(user => {
              this.htmlReferences.cardsList.innerHTML = `
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
        this.htmlReferences.modalActive.classList.add('active');
        this.htmlReferences.modalEdit.classList.add('active');
        let id = iconsForm.formIcons.value;
        const getData = {method: 'get'};
        fetch(`${this.url}/${id}`, getData).then(response => {
            console.log(response);
            return response.json();
        }).then(user => {
            this.htmlReferences.editedData.name.value = user.name;
            this.htmlReferences.editedData.email.value = user.email;
            this.htmlReferences.editedData.location.value = user.ubication;
        });

    }
}

  deletUser(){
    if(iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto')
    } else {
        this.htmlReferences.modalActive.classList.add('active');
        this.htmlReferences.modalDelete.classList.add('active');
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
        this.htmlReferences.cardsList.innerHTML = "";
        this.htmlReferences.modalActive.classList.remove('active');
        this.htmlReferences.modalDelete.classList.remove('active');
    })
};

  cancelDel() {
    this.htmlReferences.modalActive.classList.remove('active');
    this.htmlReferences.modalDelete.classList.remove('active');
};
}