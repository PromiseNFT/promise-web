/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';
import { format } from 'date-fns';

export class AppServer {
  static api = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      Options: '**',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    baseURL: 'http://localhost:3030',
    timeout: 5000, // timeout 5초
  });

  // 계약서 리스트 조회
  static getContracts = async () => {
    return this.api.get('/contract', { withCredentials: false });
  };

  // 계약서 상세 조회
  static getContractDetail = async (id: number) => {
    console.log('id : ', id);
    return this.api.get(`/contract/${id}`, { withCredentials: false });
  };

  // 계약서 생성
  static createContract = async ({
    title,
    ctnt,
    date,
    time,
    location,
    head_count,
  }: {
    title: string;
    ctnt: string;
    date: string;
    time: string;
    location: string;
    head_count: number;
  }) => {
    await axios({
      method: 'post',
      url: 'http://localhost:3030/contract',
      data: {
        title,
        ctnt,
        date: format(new Date(date), 'yyMMdd'),
        time,
        location,
        head_count: Number(head_count),
      },
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      responseType: 'json',
    });
  };

  // 계약서 수정
  static updateContract = async ({
    id,
    title,
    ctnt,
    date,
    time,
    location,
    head_count,
  }: {
    id: number;
    title: string;
    ctnt: string;
    date: string;
    time: string;
    location: string;
    head_count: number;
  }) => {
    await axios({
      method: 'put',
      url: `http://localhost:3030/contract/${id}`,
      data: {
        title,
        ctnt,
        date: format(new Date(date), 'yyMMdd'),
        time,
        location,
        head_count: Number(head_count),
      },
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      responseType: 'json',
    });
  };

  // 계약서 삭제
  static deleteContract = async (id: number) => {
    return this.api.delete(`/contract/${id}`, { withCredentials: false });
  };

  // 계약서에 서명
  static signContract = async (id: number) => {
    return this.api.get(`/contract/${id}/sign`, { withCredentials: false });
  };

  // 계약서 kip17 발행
  static publishContract = async (id: number) => {
    return this.api.get(`/contract/${id}/tx`, { withCredentials: false });
  };
}
