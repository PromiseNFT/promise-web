// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getResult, prepare, request } from 'klip-sdk';
import { MouseEventHandler, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthProvider';

interface Return {
  address: string;
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

const MAINNET_NETWORK_ID = 8217;

export const useConnectButton = (): Return => {
  const authContext = useAuthContext();

  const { klaytn } = window;
  const [address, setAddress] = useState<string>('CONNECT WALLET');

  const onClick = async (): Promise<void> => {
    const bappName = '약속';
    const successLink = 'myApp://...';
    const failLink = 'myApp://...';
    const res = await prepare.auth({ bappName, successLink, failLink });
    if (res.err) {
      // 에러 처리
      console.log('res.err : ', res.err);
    } else if (res.request_key) {
      // request_key 보관
      request(res.request_key, () => alert('모바일 환경에서 실행해주세요'));
      const interval = setInterval(async () => {
        const response = await getResult(res.request_key);
        if (response.status === 'completed') {
          authContext?.setUser((prev) => {
            return { ...prev, token: response.result.klaytn_address };
          });
          clearInterval(interval);
        }
      }, 1000);
    }
    // const loginSuccess = await kaikasLogin();
    // if (loginSuccess === true) {
    //   // 사인 로직 구상중
    //   // const caver = new Caver(klaytn);
    // }
    // console.log('window.klaytn : ', window.klaytn);
    // return;
  };

  return {
    address,
    onClick,
  };
};
