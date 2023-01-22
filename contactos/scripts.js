import { ContactsHTMLElements } from './ContactsHTMLElements.js'

const sendDataButton = document.querySelector('#send-data-button');
const noSendDataButton = document.querySelector('#no-send-data-button');

const app = new ContactsHTMLElements('http://localhost:8000');

const sendData = () => {
    app.sendData();
};

const noSendData = () =>{
    app.noSendData();
}

app.getContacts();

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