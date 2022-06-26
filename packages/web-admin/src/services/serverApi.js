import axiosAuth from "./axiosAuth";

const serverApi = {
  getAll: (data) => {
    const url = `/server/ajax`;
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = `/server/add/`;
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/server/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (id) => {
    const url = `/server/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default serverApi;