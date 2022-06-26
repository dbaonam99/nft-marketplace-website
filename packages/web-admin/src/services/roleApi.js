import axiosAuth from "./axiosAuth";

const roleApi = {
  getAll: (data) => {
    const url = "/role/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/role/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/role/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (id) => {
    const url = `/role/delete/${id}`;
    return axiosAuth.post(url);
  },
  getAllFeatures: () => {
    const url = "/feature/list/";
    return axiosAuth.get(url);
  },
  getAllFeaturesRoles: (id) => {
    const url = `/role/feature/${id}`;
    return axiosAuth.get(url);
  },
  addFeatureToRole: (roleId, data) => {
    const url = `/role/feature/${roleId}`;
    return axiosAuth.post(url, data);
  },
  removeFeatureFromRole: (id) => {
    const url = `/rolefeature/delete/${id}`;
    return axiosAuth.post(url);
  },
  editFeatureRole: (id, data) => {
    const url = `/rolefeature/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
}

export default roleApi;  