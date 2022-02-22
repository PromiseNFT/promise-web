/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';

export class AppServer {
  static api = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: 'http://localhost:3030',
    timeout: 5000, // timeout 5초
  });

  static getContracts = async () => {
    return this.api.get('/contract');
  };

  static getContractDetail = async (id: number) => {
    return this.api.get('/contract', { id });
  };
}
