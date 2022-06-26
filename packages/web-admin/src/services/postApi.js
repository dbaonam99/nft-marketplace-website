import axiosAuth from "./axiosAuth";

const postsApi = {
  getAll: (data) => {
    const url = "/post/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/post/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/post/edit/${id}`;
    return axiosAuth.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/post/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default postsApi;