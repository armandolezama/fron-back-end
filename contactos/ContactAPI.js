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
    this.fetchConfig = {...this.defaultFetchConfig}
    this.response = {};
  };

  async getSingleContact(payload = contactModel.id){
    this.fetchConfig = {
      method: 'get',
      body: '',
    };
    this.response = await this.fetch(`${this.url}/${payload}`);
  };

  async getAllContacts(){
    this.fetchConfig = {
      method: 'get',
      body: '',
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
      headers:{
          'Content-Type': 'application/json'
        }
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
      headers:{
          'Content-Type': 'application/json'
        }
    };

    this.response = await this.fetch();
  };

  async deleteContact(payload = contactModel.id){};

  async fetch(direction = ''){
    const response = await fetch(`${this.url}/${direction}`, this.fetchConfig);
    const parsedResponse  = await response.json();

    this.fetchConfig = {...this.defaultFetchConfig};

    return parsedResponse;
  };
}
