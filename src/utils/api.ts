/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';
import { format } from 'date-fns';

// export const API_URL = 'https://3.34.134.170';
export const API_URL = 'http://localhost:3030';

export class AppServer {
  static api = async (userAddress: string) => {
    return await axios.create({
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      baseURL: API_URL,
      timeout: 5000, // timeout 5초
    });
  };

  // 계약서 리스트 조회
  static getContracts = async (userAddress: string) => {
    return await (
      await this.api(userAddress)
    ).get('/contract', {
      withCredentials: false,
    });
  };

  // 계약서 상세 조회
  static getContractDetail = async (userAddress: string, id: number) => {
    console.log('id : ', id);
    return await (
      await this.api(userAddress)
    ).get(`/contract/${id}`, {
      withCredentials: false,
    });
  };

  // 계약서 생성
  static createContract = async ({
    userAddress,
    title,
    ctnt,
    date,
    time,
    location,
    head_count,
  }: {
    userAddress: string;
    title: string;
    ctnt: string;
    date: string;
    time: string;
    location: string;
    head_count: number;
  }) => {
    await axios({
      method: 'post',
      url: `${API_URL}/contract`,
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
        'User-Addr': userAddress,
      },
      responseType: 'json',
    });
  };

  // 계약서 수정
  static updateContract = async ({
    userAddress,
    id,
    title,
    ctnt,
    date,
    time,
    location,
    head_count,
  }: {
    userAddress: string;
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
      url: `${API_URL}/contract/${id}`,
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
        'User-Addr': userAddress,
      },
      responseType: 'json',
    });
  };

  // 계약서 삭제
  static deleteContract = async (userAddress: string, id: number) => {
    return await (
      await this.api(userAddress)
    ).delete(`/contract/${id}`, {
      withCredentials: false,
    });
  };

  // 계약서에 서명
  static signContract = async (userAddress: string, id: number) => {
    return await (
      await this.api(userAddress)
    ).post(`/contract/${id}/sign`, {
      withCredentials: false,
    });
  };

  // 계약서 kip17 발행
  static publishContract = async (userAddress: string, id: number) => {
    return await (
      await this.api(userAddress)
    ).post(`/contract/${id}/tx`, {
      withCredentials: false,
    });
  };
}
