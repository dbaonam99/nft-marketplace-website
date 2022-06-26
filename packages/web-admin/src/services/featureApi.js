import axiosAuth from "./axiosAuth";

const featureApi = {
  getAll: (data) => {
    const url = "/feature/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/feature/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/feature/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (id) => {
    const url = `/feature/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default featureApi;  