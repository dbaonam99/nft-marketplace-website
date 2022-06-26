import axiosAuth from "./axiosAuth";

const adsApi = {
  getAll: (data) => {
    const url = "/ads/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/ads/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/ads/edit/${id}`;
    return axiosAuth.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/ads/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default adsApi;