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

const cardEventHandler = async () => {
    const id = templateController.iconsForm.formIcons.value;
    await contactApi.getSingleContact(id);
    templateController.updateCardView(contactApi.response);
}

const printIcons = list => {
    templateController.printIcons(list);
    templateController.setCardCustomEventHandler(cardEventHandler);
}

const editUser = async () => {

    if(templateController.iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto');
    } else {
        const id = templateController.iconsForm.formIcons.value;
        await contactApi.getSingleContact(id);
        templateController.enableEditFormModal();
        templateController.setEditContactForm(contactApi.response);
    }
}

function deletUser(){
    if(templateController.iconsForm.formIcons.value == ""){
        alert('Por favor, seleccione un contacto')
    } else {
        templateController.enableDeleteFormModal();
    }
}

const delContact = async () => {
    const id = templateController.iconsForm.formIcons.value;
    
    await contactApi.deleteContact(id)
    
    printIcons(contactApi.response);

    templateController.cardView.innerHTML = "";
    templateController.disableModal();
};

function cancelDel() {
    templateController.disableModal();
};

templateController.modalSendDataButton.addEventListener('click', sendData);

templateController.editUserOption.addEventListener('click', editUser);
templateController.deleteUserOption.addEventListener('click', deletUser);
templateController.modalDeleteContactButton.addEventListener('click', delContact);
templateController.modalCancelDeleteContactButton.addEventListener('click', cancelDel);

getContacts();