/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';
import { format } from 'date-fns';

export const API_URL = 'https://api.gssoft79.xyz';
// Second URL : https://promisenft.ml

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
    return await axios({
      method: 'get',
      url: `${API_URL}/contract`,
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      responseType: 'json',
      withCredentials: false,
    });
  };

  // 계약서 상세 조회
  static getContractDetail = async (userAddress: string, id: number) => {
    return await axios({
      method: 'get',
      url: `${API_URL}/contract/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      responseType: 'json',
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
    return await axios({
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
    return await axios({
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
    return await axios({
      method: 'delete',
      url: `${API_URL}/contract/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      responseType: 'json',
      withCredentials: false,
    });
  };

  // 계약서에 서명
  static signContract = async (userAddress: string, id: number) => {
    return await axios({
      method: 'post',
      url: `${API_URL}/contract/${id}/sign`,
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      responseType: 'json',
      withCredentials: false,
    });
  };

  // 계약서 kip17 발행
  static publishContract = async (userAddress: string, id: number) => {
    return await axios({
      method: 'post',
      url: `${API_URL}/contract/${id}/tx`,
      headers: {
        'Content-Type': 'application/json',
        Options: '**',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'User-Addr': userAddress,
      },
      responseType: 'json',
      withCredentials: false,
    });
  };
}
