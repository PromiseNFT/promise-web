export interface ParamType {
  promiseType: 'create' | 'read' | 'edit';
  id?: number;
}

export interface ContractDetail {
  id?: number; // BIGINT
  user_addr?: string;
  crt_dttm?: string;
  account_addr?: string;
  account_pub_key?: string;
  title: string;
  ctnt: string;
  date: string;
  time: string;
  location: string;
  head_count: number; // The number of Contract's signers
  signs?: { id: number; sign_dttm?: Date; user_addr: string }[];
  tx?: {
    // If Null -> The contract is that no transaction has been created
    id: number;
    tx_dttm: 'DATETIME';
    tx_hash: 'String Tx Hash';
    image_path: 'Path Of Image'; // 구현 안 할 수도 . . .
    token_id: 'Token Id Str';
    meta_data: 'Content of Tx (Str)';
  };
}
