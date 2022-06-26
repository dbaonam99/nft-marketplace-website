import axiosAuth from "./axiosAuth";

const filmsApi = {
  getAll: (data) => {
    const url = "/film/ajax";
    return axiosAuth.post(url, data);
  },
  addItem: (data) => {
    const url = "/film/add/";
    return axiosAuth.post(url, data);
  },
  editItem: (id, data) => {
    const url = `/film/edit/${id}`;
    return axiosAuth.post(url, data);
  },
  deleteItem: (id) => {
    const url = `/film/delete/${id}`;
    return axiosAuth.post(url);
  },
  getAllItem: (type, params) => {
    const url =  `/item/${type}/search/`;
    return axiosAuth.get(url, { params });
  },
  getAllItemWithoutSearch: (type) => {
    const url =  `/item/${type}/list/`;
    return axiosAuth.get(url);
  }
}

export default filmsApi;