const contactModel =         {
  id: 0,
  name: "",
  email: "",
  ubication: "",
};

export class ContactAPI {
  constructor(url){
    this.url = url;
    this.defaultFetchConfig = {
      method: '',
      body: '',
    };
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.fetchConfig = {...this.defaultFetchConfig}
    this.response = {};
  };

  //TO-DO: add validation and error handling to prevent 
  //empty payload and get all contacts instead single one
  async getSingleContact(payload = contactModel.id){
    this.fetchConfig = {
      method: 'get',
    };
    this.response = await this.fetch(payload);
  };

  async getAllContacts(){
    this.fetchConfig = {
      method: 'get',
    };

    this.response = await this.fetch();
  };

  async editContact(payload = contactModel){
    const { name, email, ubication } = payload;
    this.fetchConfig = {
      method: 'put',
      body: JSON.stringify(
          { 
              name,
              email,
              ubication,
          }
      ),
      headers: this.defaultHeaders,
    };

    this.response = await this.fetch(payload.id);
  };

  async createContact(payload = contactModel){
    const { name, email, ubication } = payload;
    this.fetchConfig = {
      method: 'post',
      body: JSON.stringify(
          { 
              name,
              email,
              ubication,
          }
      ),
      headers: this.defaultHeaders,
    };

    this.response = await this.fetch();
  };

  async deleteContact(payload = contactModel.id){
    this.fetchConfig = {
      method: 'delete',
      headers: this.defaultHeaders,
    }

    this.response = await this.fetch(payload);
  };

  async fetch(direction = ''){
    const response = await fetch(`${this.url}/${direction}`, this.fetchConfig);
    const parsedResponse  = await response.json();

    this.fetchConfig = {...this.defaultFetchConfig};

    return parsedResponse;
  };
}
