import axiosAuth from "./axiosAuth";

const contentsApi = {
  getAll: (type, id, data) => {
    const url = `/language/${type}/${id}/ajax`;
    return axiosAuth.post(url, data);
  },
  addItem: (type, id, data) => {
    const url = `/language/${type}/${id}/add/`;
    return axiosAuth.post(url, data);
  },
  getAllLanguages: () => {
    const url =  "/item/language/list/";
    return axiosAuth.get(url);
  },
  editItem: (type, filmId, id, data) => {
    const url = `/language/${type}/${filmId}/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (type, filmId, id) => {
    const url = `/language/${type}/${filmId}/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default contentsApi;