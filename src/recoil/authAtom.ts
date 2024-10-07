import {atom} from 'recoil';

export interface AuthTypes {
  email: string;
  authToken: string;
}

const authState = atom({
  key: 'authState',
  default: '',
});

export default authState;
