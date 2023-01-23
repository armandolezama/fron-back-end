import { ContactTemplateController } from "./ContactTemplateController.js";
import { ContactAPI } from "./ContactAPI.js";

export class ContactBookApp {
  constructor(){

    this.url = 'http://localhost:8000';
    
    this.templateController = new ContactTemplateController();
    
    this.contactApi = new ContactAPI(this.url);

  }

  async getContacts(){
    
    await this.contactApi.getAllContacts();

    this.printIcons(this.contactApi.response);

  }

  async sendData(){

    await this.contactApi.createContact(this.templateController.getNewContactFormData());

    this.printIcons(this.contactApi.response);

    this.templateController.disableModal();

    this.templateController.clearNewContactForm();

  };

  async submitHandler(event) {
    
    event.preventDefault()
    
    const { name, email, ubication } = this.templateController.getEditContactFormData();

    if(
        name == "" ||
        email == "" ||
        ubication == ""
    ){
        alert('Por favor, llene los campos antes de enviar la actualización')
    } else {

        const id = this.templateController.getActiveCardId();

        await this.contactApi.editContact({id, name, email, ubication });

        this.printIcons(this.contactApi.response);

        this.templateController.updateCardClicked(id);

        this.templateController.disableModal();
    
        this.templateController.clearNewContactForm();

    }
  }

  async cardEventHandler(){

    const id = this.templateController.getActiveCardId();

    await this.contactApi.getSingleContact(id);
    
    this.templateController.updateCardView(this.contactApi.response);

  }

  printIcons(list){
    
    this.templateController.printIcons(list);
    
    this.templateController.setCardCustomEventHandler(this.cardEventHandler.bind(this));

  }

  async editUser(){

    if(this.templateController.getActiveCardId() == ""){
    
      alert('Por favor, seleccione un contacto');
    
    } else {
    
      const id = this.templateController.getActiveCardId();
    
      await this.contactApi.getSingleContact(id);
    
      this.templateController.enableEditFormModal();
    
      this.templateController.setEditContactForm(this.contactApi.response);
    
    }
  }

  deleteUser(){
    
    if(this.templateController.getActiveCardId() == ""){
    
      alert('Por favor, seleccione un contacto')
    
    } else {
    
      this.templateController.enableDeleteFormModal();
    
    }

  }

  async deleteContact(){

    const id = this.templateController.getActiveCardId();
    
    await this.contactApi.deleteContact(id)
    
    this.printIcons(this.contactApi.response);

    this.templateController.cardView.innerHTML = "";

    this.templateController.disableModal();

  };

  cancelDeleteContact(){
    this.templateController.disableModal();
};

  start(){

    this.templateController.submitEditButton.addEventListener('click', this.submitHandler.bind(this));

    this.templateController.modalSendDataButton.addEventListener('click', this.sendData.bind(this));
    
    this.templateController.editUserOption.addEventListener('click', this.editUser.bind(this));
    
    this.templateController.deleteUserOption.addEventListener('click', this.deleteUser.bind(this));
    
    this.templateController.modalDeleteContactButton.addEventListener('click', this.deleteContact.bind(this));

    this.templateController.modalCancelDeleteContactButton.addEventListener('click', this.cancelDeleteContact.bind(this));

    this.getContacts();
    
  }
 }
