import axios from './baseService';

export const fetchOrganizations = (params: any = {}) => {
  return axios
    .get('/organizations', {
      params: { ...params },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchOrganizationBySlug = (slug: string) => {
  return axios
    .get(`/organizations/${slug}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const createOrganization = (data: any = {}) => {
  return axios
    .post('/organizations', data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const updateOrganization = (id: number, data: any) => {
  return axios
    .put(`/organizations/${id}`, data)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const deleteOrganization = (id: number) => {
  return axios
    .delete(`/organizations/${id}`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
export const fetchOrganizationUsersBySlug = (slug: string) => {
  return axios
    .get(`/organizations/${slug}/users`)
    .then((res) => [null, res.data])
    .catch((err) => [err]);
};
