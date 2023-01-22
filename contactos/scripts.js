const cardsList = document.getElementById('cards-list');
const cardsIcon = document.getElementById('cards-icon');
const iconsForm = document.getElementById('icons-form');
const submitButton = document.getElementById('submit-button');
const submitEditButton = document.getElementById('submit-edit-button');
const newData = document.getElementById('new-data');
const editedData = document.getElementById('edit-data');
const modalActive = document.querySelector('.modal');
const modalEdit = document.querySelector('.modal-edit');
const modalPost = document.querySelector('.modal-post-user');
const modalDelete = document.querySelector('.modal-delete');

const modalSendDataButton = document.querySelector('#modal-send-data-button');
const modalCancelSendDataButton = document.querySelector('#modal-cancel-send-data-button');
const editUserOption = document.querySelector('#edit-user-option');
const deleteUserOption = document.querySelector('#delete-user-option');
const modalDeleteContactButton = document.querySelector('#modal-delete-contact-button');
const modalCancelDeleteContactButton = document.querySelector('#modal-cancel-delete-contact-button');

const url = 'http://localhost:8000';

submitButton.addEventListener('click', function(event){
    event.preventDefault()

    if(
        newData.name.value == "" ||
        newData.email.value == "" ||
        newData.location.value == ""
    ){
        alert('Por favor, llene todos los campos antes de enviar')
    } else {
        modalActive.classList.add('active');
        modalPost.classList.add('active');
    }

});

function sendData() {

    const newName = newData.name.value;
    const newEmail = newData.email.value;
    const newLocation = newData.location.value;

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
    fetch(`${url}`, putData)
        .then(response => response.json()
        )
    .then(function(responseJson){
        printIcons(responseJson);
    }
    ).catch(error => console.error('Error:', error));
    modalActive.classList.remove('active');
    modalPost.classList.remove('active');
    newData.name.value = "";
    newData.email.value = "";
    newData.location.value = "";

};

function noSendData(){
    modalActive.classList.remove('active');
    modalPost.classList.remove('active');
}

submitEditButton.addEventListener('click', function(event){
    event.preventDefault()
    let edited = {};
    edited.name = editedData.name.value;
    edited.email = editedData.email.value;
    edited.ubication = editedData.location.value;

    if(
        editedData.name.value == "" ||
        editedData.email.value == "" ||
        editedData.location.value == ""
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
    
        let id = iconsForm.formIcons.value;
        console.log(id)
        fetch(`${url}/${id}`, putData)
            .then(response => response.json()
            )
        .then(function(responseJson){
            printIcons(responseJson);
            const cards = document.querySelectorAll(".icons-input");
            console.log(id)
            for(let i = 0; i < cards.length; i++){
                console.log(cards[i].value == id)
                if(cards[i].value == id){
                    cards[i].click();
                }
    
                modalActive.classList.remove('active');
                modalEdit.classList.remove('active');
            }
        }
        ).catch(error => console.error('Error:', error));
    }

});

function getContacts(){
    const getData = {
        method: 'get'
    };
    fetch(url, getData).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(responseJson) {
        console.log(responseJson);
        printIcons(responseJson);
    });
}

getContacts();

function printIcons(list){
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

    iconsForm.innerHTML = cardsIcons;

    const cards = document.querySelectorAll(".icons-input");

    for(let card of cards){
        card.addEventListener("change", function(){
            const getData = {
                method: 'get'
            };
            let id = iconsForm.formIcons.value;
            fetch(`${url}/${id}`, getData).then(function(response){
                console.log(response);
                return response.json();
            }).then(function(user){
                cardsList.innerHTML = `
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

modalActive.addEventListener('click', function(){
    if(event.target !== this){
        return
    } else {
        modalActive.classList.remove('active');
        modalEdit.classList.remove('active');
        modalDelete.classList.remove('active');
        modalPost.classList.remove('active');
    }
});

function editUser() {

    if(iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto');
    } else {
        modalActive.classList.add('active');
        modalEdit.classList.add('active');
        let id = iconsForm.formIcons.value;
        const getData = {method: 'get'};
        fetch(`${url}/${id}`, getData).then(function(response){
            console.log(response);
            return response.json();
        }).then(function(user){
            editedData.name.value = user.name;
            editedData.email.value = user.email;
            editedData.location.value = user.ubication;
        });

    }

    /*
    let id = iconsForm.formIcons.value;
    fetch(`${url}/${id}`, getData).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(user){
        cardsList.innerHTML = `
        <label class="form-text" for="name"> Nombre</label>
        <input class="input-form" type="text" name="inputName" placeholder="Escribe el nuevo nombre" id="name">
        <label class="form-text" for="email"> Correo electrónico </label>
        <input class="input-form" type="text" name="inputEmail" placeholder="Escribe el nuevo correo" id="email">
        <label class="form-text" for="location"> Ubicación</label>
        <input class="input-form" type="text" name="inputLocation" placeholder="Escribe la nueva ubicación" id="location">
        <input id="submit-button" class="input-form" type="submit">
        `
    });*/
}

function deletUser(){
    if(iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto')
    } else {
        modalActive.classList.add('active');
        modalDelete.classList.add('active');
    }
}

function delContact() {
    const delData = {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json'
          }
    }

    let id = iconsForm.formIcons.value;
    fetch(`${url}/${id}`, delData).then(function(response){
        return response.json();
    }).then(function(responseJson){
        printIcons(responseJson);
        cardsList.innerHTML = "";
        modalActive.classList.remove('active');
        modalDelete.classList.remove('active');
    })
};

function cancelDel() {
    modalActive.classList.remove('active');
    modalDelete.classList.remove('active');
};

modalSendDataButton.addEventListener('click', sendData);
modalCancelSendDataButton.addEventListener('click', noSendData);
editUserOption.addEventListener('click', editUser);
deleteUserOption.addEventListener('click', deletUser);
modalDeleteContactButton.addEventListener('click', delContact);
modalCancelDeleteContactButton.addEventListener('click', cancelDel);