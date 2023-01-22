class Contact {
  constructor(contactData = {
    name: '',
    email: '',
    location: ''
  }){
    const { name, email, location } = contactData;
    this.name = name;
    this.email = email;
    this.location = location
  }

  createTemplateCard(){
    return `
    <div class='card'> 
        <div class="card-inner">
            <h2 class="text-info">${this.name} </h2>
            <p class="text-info"> ${this.email}</p>
            <p class="text-info"> ${this.ubication}</p>
        </div>
        <div class="card-inner">
            <img class="img-contact" src="https://cdn3.iconfinder.com/data/icons/communication/512/contact_A-512.png" alt="">
        </div>
    </div>
    `
  }

  createTemplateIcon(){
    return `
    <label class='icon' for="icon${user.id}">
        <h4 class="text-info">${user.name} </h4>
    </label>
    <input class="icons-input" type="radio" name="formIcons" id="icon${user.id}" value="${user.id}">
    `
  }

  updateContact(updatedData = {
    name: '',
    email: '',
    location: ''
  }){
    this.name = updatedData.name;
    this.email = updatedData.email;
    this.location = updatedData.location
  }

  getData(){
    const { name, email, location } = this;
    return { name, email, location };
  }
 }

 class ContactBook {
  constructor (contacts = []){
    this.contacts = contacts;
  }

  //TO-DO add functionality to find contact by any prop
  getContact(query = {
    email
  }){
    return this.contacts.filter(item => item.email === query.email)
  }

  getContacts(){
    return this.contacts;
  }

  updateContact(query = {
    email
  }, updatedData = {
    name: '',
    email: '',
    location: ''
  }){
    const contact = this.contacts.find(item => item.email === query.email);

    contact = new Contact(updatedData);
  }

  createContact(data = {
    name: '',
    email: '',
    location: ''
  }){
    this.contacts = [...this.contacts, new Contact(data)]
  }

  deleteContact(query = {
    email
  }){
    this.contacts = this.contacts.filter(item => item.email !== query.email);
  }
 }

 class ContactBookApp {
  constructor(){
    this.contactBook = new ContactBook();
  }
 }



 /*
         <script src="Contact.js"></script>
        <script src="ContactBook.js"></script>
        <script src="ContactBookApp.js"></script>
        <script src="ContactHTMLElements.js"></script>
 */