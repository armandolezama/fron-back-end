import { ContactTemplateController } from "./ContactTemplateController.js";
import { ContactAPI } from "./ContactAPI.js";

const url = 'http://localhost:8000';

const templateController = new ContactTemplateController();
const contactApi = new ContactAPI(url);

const sendData = async () => {

    const newName = templateController.newData.name.value;
    const newEmail = templateController.newData.email.value;
    const newLocation = templateController.newData.location.value;

    await contactApi.createContact({name: newName, email: newEmail, ubication: newLocation})
    printIcons(contactApi.response);

    templateController.modalActive.classList.remove('active');
    templateController.modalPost.classList.remove('active');
    templateController.newData.name.value = "";
    templateController.newData.email.value = "";
    templateController.newData.location.value = "";

};

templateController.submitEditButton.addEventListener('click', function(event){
    event.preventDefault()
    let edited = {};
    edited.name = templateController.editedData.name.value;
    edited.email = templateController.editedData.email.value;
    edited.ubication = templateController.editedData.location.value;

    if(
        templateController.editedData.name.value == "" ||
        templateController.editedData.email.value == "" ||
        templateController.editedData.location.value == ""
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
    
        let id = templateController.iconsForm.formIcons.value;
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
    
                templateController.modalActive.classList.remove('active');
                templateController.modalEdit.classList.remove('active');
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

    templateController.iconsForm.innerHTML = cardsIcons;

    const cards = document.querySelectorAll(".icons-input");

    for(let card of cards){
        card.addEventListener("change", function(){
            const getData = {
                method: 'get'
            };
            let id = templateController.iconsForm.formIcons.value;
            fetch(`${url}/${id}`, getData).then(function(response){
                console.log(response);
                return response.json();
            }).then(function(user){
                templateController.cardsList.innerHTML = `
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

templateController.modalActive.addEventListener('click', function(event){
    if(event.target !== this){
        return
    } else {
        templateController.modalActive.classList.remove('active');
        templateController.modalEdit.classList.remove('active');
        templateController.modalDelete.classList.remove('active');
        templateController.modalPost.classList.remove('active');
    }
});

function editUser() {

    if(templateController.iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto');
    } else {
        templateController.modalActive.classList.add('active');
        templateController.modalEdit.classList.add('active');
        let id = templateController.iconsForm.formIcons.value;
        const getData = {method: 'get'};
        fetch(`${url}/${id}`, getData).then(function(response){
            console.log(response);
            return response.json();
        }).then(function(user){
            templateController.editedData.name.value = user.name;
            templateController.editedData.email.value = user.email;
            templateController.editedData.location.value = user.ubication;
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
    if(templateController.iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto')
    } else {
        templateController.modalActive.classList.add('active');
        templateController.modalDelete.classList.add('active');
    }
}

function delContact() {
    const delData = {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json'
          }
    }

    let id = templateController.iconsForm.formIcons.value;
    fetch(`${url}/${id}`, delData).then(function(response){
        return response.json();
    }).then(function(responseJson){
        printIcons(responseJson);
        templateController.cardsList.innerHTML = "";
        templateController.modalActive.classList.remove('active');
        templateController.modalDelete.classList.remove('active');
    })
};

function cancelDel() {
    modalActive.classList.remove('active');
    modalDelete.classList.remove('active');
};

templateController.modalSendDataButton.addEventListener('click', sendData);

templateController.editUserOption.addEventListener('click', editUser);
templateController.deleteUserOption.addEventListener('click', deletUser);
templateController.modalDeleteContactButton.addEventListener('click', delContact);
templateController.modalCancelDeleteContactButton.addEventListener('click', cancelDel);
