import axios from './baseService';

export const fetchProjects = (params: any = {}) => {
  return axios
    .get('/projects', {
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchProjectBySlug = (slug: string) => {
  return axios
    .get(`/projects/${slug}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchProjectTagsBySlug = (slug: string) => {
  return axios
    .get(`/projects/${slug}/tags`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchProjectStatusesBySlug = (slug: string) => {
  return axios
    .get(`/projects/${slug}/statuses`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const createProject = (data: any = {}) => {
  return axios
    .post('/projects', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const updateProject = (id: number, data: any) => {
  return axios
    .put(`/projects/${id}`, data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const deleteProject = (id: number) => {
  return axios
    .delete(`/projects/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
