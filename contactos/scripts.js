import { ContactTemplateController } from "./ContactTemplateController.js";
import { ContactAPI } from "./ContactAPI.js";

const url = 'http://localhost:8000';

const templateController = new ContactTemplateController();
const contactApi = new ContactAPI(url);

const getContacts = async () => {
    
    await contactApi.getAllContacts();

    printIcons(contactApi.response);
}

const sendData = async () => {

    await contactApi.createContact(templateController.getNewContactFormData());

    printIcons(contactApi.response);

    templateController.disableModal();

    templateController.clearNewContactForm();
};

templateController.submitEditButton.addEventListener('click', async event => {
    event.preventDefault()
    const { name, email, ubication } = templateController.getEditContactFormData();

    if(
        name == "" ||
        email == "" ||
        ubication == ""
    ){
        alert('Por favor, llene los campos antes de enviar la actualización')
    } else {

        const id = templateController.iconsForm.formIcons.value;

        await contactApi.editContact({id, name, email, ubication });

        printIcons(contactApi.response);

        templateController.updateCardClicked(id);

        templateController.disableModal();
    
        templateController.clearNewContactForm();
    }

});

function printIcons(list){

    templateController.printIcons(list);

    templateController.setCardCustomEventHandler(async () => {
        const id = templateController.iconsForm.formIcons.value;
        await contactApi.getSingleContact(id);
        templateController.updateCardView(contactApi.response);
    });
}

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
        cardView.innerHTML = `
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
        templateController.cardView.innerHTML = "";
        templateController.modalActive.classList.remove('active');
        templateController.modalDelete.classList.remove('active');
    })
};

function cancelDel() {
    templateController.modalActive.classList.remove('active');
    templateController.modalDelete.classList.remove('active');
};

templateController.modalSendDataButton.addEventListener('click', sendData);

templateController.editUserOption.addEventListener('click', editUser);
templateController.deleteUserOption.addEventListener('click', deletUser);
templateController.modalDeleteContactButton.addEventListener('click', delContact);
templateController.modalCancelDeleteContactButton.addEventListener('click', cancelDel);

getContacts();