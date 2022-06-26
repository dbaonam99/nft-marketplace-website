import axiosAuth from "./axiosAuth";

const itemApi = {
  getAll: (type, data) => {
    const url = `/item/${type}/ajax`;
    return axiosAuth.post(url, data);
  },
  addItem: (type, data) => {
    const url = `/item/${type}/add/`;
    return axiosAuth.post(url, data);
  },
  editItem: (type, id, data) => {
    const url = `/item/${type}/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (type, id) => {
    const url = `/item/${type}/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default itemApi;