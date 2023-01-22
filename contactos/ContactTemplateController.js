export class ContactTemplateController {
  constructor(){
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
    this.modalSendDataButton = document.querySelector('#modal-send-data-button');
    this.modalCancelSendDataButton = document.querySelector('#modal-cancel-send-data-button');
    this.editUserOption = document.querySelector('#edit-user-option');
    this.deleteUserOption = document.querySelector('#delete-user-option');
    this.modalDeleteContactButton = document.querySelector('#modal-delete-contact-button');
    this.modalCancelDeleteContactButton = document.querySelector('#modal-cancel-delete-contact-button');
  };
}