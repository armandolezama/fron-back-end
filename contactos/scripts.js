import { ContactsHTMLElements } from './ContactsHTMLElements.js'

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
const htmlReferences = {
    cardsList,
    cardsIcon,
    iconsForm,
    submitButton,
    submitEditButton,
    newData,
    editedData,
    modalActive,
    modalEdit,
    modalPost,
    modalDelete,
  }

const app = new ContactsHTMLElements(htmlReferences, 'http://localhost:8000');

function sendData() {
    app.sendData();
};

function noSendData(){
    app.noSendData();
}

app.getContacts();

modalActive.addEventListener('click', function(event){
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
    app.editUser();
}

function deletUser(){
    app.deletUser();
}

function delContact() {
    app.delContact();
};

function cancelDel() {
    app.cancelDel();
};