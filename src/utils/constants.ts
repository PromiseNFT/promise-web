import axios from 'axios';

export class AppServer {
  static api = async () => {
    return await axios.create({
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:3030',
      timeout: 5000, // timeout 5초
    });
  };

  static getContracts = async () => {
    return (await this.api()).get('/contract');
  };
}
