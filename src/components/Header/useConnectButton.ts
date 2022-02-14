import Caver from 'caver-js';
import { MouseEventHandler, useState } from 'react';

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
}

const MAINNET_NETWORK_ID = 8217;

export const useConnectButton = (): Return => {
  const { klaytn } = window;
  const [address, setAddress] = useState<string>('CONNECT WALLET');

  const kaikasLogin = async (): Promise<boolean> => {
    if (klaytn === undefined) {
      alert('카이카스를 설치해주세요.');
      return false;
    }

    const wallet = await klaytn.enable();
    const version = await klaytn.networkVersion;

    if (wallet !== undefined && version === MAINNET_NETWORK_ID) {
      setAddress(wallet[0]);
      alert('지갑 연결 성공!');
      return true;
    }
    return false;
  };

  const onClick = async (): Promise<void> => {
    const loginSuccess = await kaikasLogin();
    if (loginSuccess === true) {
      // 사인 로직 구상중
      // const caver = new Caver(klaytn);
    }
    console.log('window.klaytn : ', window.klaytn);
    return;
  };

  return {
    address,
    onClick,
  };
};
