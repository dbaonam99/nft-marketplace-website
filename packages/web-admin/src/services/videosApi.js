import axiosAuth from "./axiosAuth";

const videosApi = {
  getAll: (data) => {
    const url = "/video/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/video/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/video/edit/${id}`;
    return axiosAuth.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/video/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default videosApi;