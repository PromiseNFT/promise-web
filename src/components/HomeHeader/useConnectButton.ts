// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from 'axios';
import { MouseEventHandler } from 'react';
import { useAuthContext } from '../../contexts/AuthProvider';
import { AppServer } from '../../utils/api';

interface Return {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

declare global {
  interface Window {
    klaytn?: {
      enable: () => Promise<string[]>;
      networkVersion: number;
      selectedAddress: string;
    };
  }
  interface prepareParams {
    bappName: string;
    successLink: string;
    failLink: string;
  }
  type prepare = {
    auth: (params: prepareParams) => Promise<any>;
  };
  type request = (request_key: string, option?: Record<any, any>) => void;
  interface getResultReturn {
    request_key: string;
    result: {
      klaytn_address: string;
    };
    status: 'completed';
    expiration_time: number;
  }
  type getResult = (request_key: string) => Promise<getResultReturn>;
}

export const MAINNET_NETWORK_ID = 8217;

export const useConnectButton = (): Return => {
  const { klaytn } = window;
  const auth = useAuthContext();

  const onClick = async (): Promise<boolean> => {
    // const bappName = '약속';
    // const successLink = '';
    // const failLink = '';
    // const res = await prepare.auth({ bappName, successLink, failLink });
    // if (res.err) {
    //   // 에러 처리
    //   console.log('res.err : ', res.err);
    // } else if (res.request_key) {
    //   // request_key 보관
    //   request(res.request_key, () => alert('모바일 환경에서 실행해주세요'));
    //   const interval = setInterval(async () => {
    //     const response = await getResult(res.request_key);
    //     if (respose.status === 'completed') {
    //       authContenxt?.setUser((prev) => {
    //         return { ...prev, token: response.result.klaytn_address };
    //       });
    //       clearInterval(interval);
    //     }
    //   }, 1000);
    // }
    if (klaytn === undefined) {
      alert('카이카스를 설치해주세요.');
      return false;
    }

    const wallet = await klaytn.enable();
    const version = await klaytn.networkVersion;

    if (wallet !== undefined && version === MAINNET_NETWORK_ID) {
      console.log('wallet[0] : ', wallet[0]);
      AppServer.api.defaults.headers.common['User-Addr'] = wallet[0];
      auth?.setUser((prev) => {
        return { ...prev, token: wallet[0] };
      });
      alert('지갑 연결 성공!');
      return true;
    }
    return false;
  };

  return {
    onClick,
  };
};
