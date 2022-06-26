import axiosAuth from "./axiosAuth";

const imageApi = {
  getAll: (data) => {
    const url = "/image/ajax";
    return axiosAuth.post(url, data);
  },
  upload: (data) => {
    const url = "/image/upload";
    return axiosAuth.post(url, data, { headers: {"Content-Type": "multipart/form-data"}});
  },
  editItem: (id, data) => {
    const url = `/image/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (id) => {
    const url = `/image/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default imageApi;