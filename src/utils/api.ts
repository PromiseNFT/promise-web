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

  // 계약서 리스트 조회
  static getContracts = async () => {
    return this.api.get('/contract');
  };

  // 계약서 상세 조회
  static getContractDetail = async (id: number) => {
    console.log('id : ', id);
    return this.api.get(`/contract/${id}`);
  };

  // 계약서 생성
  static createContract = async () => {
    return this.api.post('/contract', {});
  };

  // 계약서 수정
  static updateContract = async () => {
    return this.api.put('/contract', {});
  };

  // 계약서 삭제
  static deleteContract = async () => {
    return this.api.delete('/contract', {});
  };

  // 계약서에 서명
  static signContract = async (id: number) => {
    return this.api.get(`/contract/${id}/sign`);
  };

  // 계약서 kip17 발행
  static publishContract = async (id: number) => {
    return this.api.get(`/contract/${id}/tx`);
  };
}
