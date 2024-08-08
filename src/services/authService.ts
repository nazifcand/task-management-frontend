import axios from './baseService';

interface ILoginData {
  email: string;
  password: string;
}
export const login = (data: ILoginData) => {
  return axios
    .post('/login', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};

interface IRegisterData {
  username: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
}
export const register = (data: IRegisterData) => {
  return axios
    .post('/register', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};

export const fetchMe = () => {
  return axios
    .get('/me')
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
