import axios from './baseService';

export const fetchTasks = (params: any = {}) => {
  return axios
    .get('/tasks', {
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchTaskById = (id: number) => {
  return axios
    .get(`/tasks/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const createTask = (data: any = {}) => {
  return axios
    .post('/tasks', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const updateTask = (id: number, data: any) => {
  return axios
    .put(`/tasks/${id}`, data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const deleteTask = (id: number) => {
  return axios
    .delete(`/tasks/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
