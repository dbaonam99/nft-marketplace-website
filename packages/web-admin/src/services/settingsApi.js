import axiosAuth from "./axiosAuth";

const settingsApi = {
  getAll: (data) => {
    const url = "/setting/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/setting/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/setting/edit/${id}`;
    return axiosAuth.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/setting/delete/${id}`;
    return axiosAuth.post(url);
  },
  deleteCache: () => {
    const url = "/tools/cache/clear";
    return axiosAuth.post(url);
  }
}

export default settingsApi;