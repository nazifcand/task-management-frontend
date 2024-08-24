import axios from './baseService';

export const fetchStatuses = (params: any = {}) => {
  return axios
    .get('/statuses', {
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchStatusById = (id: number) => {
  return axios
    .get(`/statuses/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const createStatus = (data: any = {}) => {
  return axios
    .post('/statuses', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const updateStatus = (id: number, data: any) => {
  return axios
    .put(`/statuses/${id}`, data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const deleteStatus = (id: number) => {
  return axios
    .delete(`/statuses/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
