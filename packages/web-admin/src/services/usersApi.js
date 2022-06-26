import axiosAuth from "./axiosAuth";

const usersApi = {
  getAll: (data) => {
    const url = "/user/ajax";
    return axiosAuth.post(url, data);
  },
  getAllRoles: () => {
    const url = "/role/list/";
    return axiosAuth.get(url);
  },
  addItem: (data) => {
    const url = "/user/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/user/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (id) => {
    const url = `/user/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default usersApi;  