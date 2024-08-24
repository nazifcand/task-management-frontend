import axios from './baseService';

export const fetchTags = (params: any = {}) => {
  return axios
    .get('/tags', {
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchTagById = (id: number) => {
  return axios
    .get(`/tags/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const createTag = (data: any = {}) => {
  return axios
    .post('/tags', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const updateTag = (id: number, data: any) => {
  return axios
    .put(`/tags/${id}`, data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const deleteTag = (id: number) => {
  return axios
    .delete(`/tags/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
