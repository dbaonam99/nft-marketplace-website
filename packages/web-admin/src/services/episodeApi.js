import axiosAuth from "./axiosAuth";

const episodeApi = {
  getAll: (filmId, data) => {
    const url = `/episode/${filmId}/ajax`;
    return axiosAuth.post(url, data);
  },
  addItem: (filmId, data) => {
    const url = `/episode/${filmId}/add/`;
    return axiosAuth.post(url, data);
  },
  editItem: (filmId, id, data) => {
    const url = `/episode/${filmId}/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (filmId, id) => {
    const url = `/episode/${filmId}/delete/${id}`;
    return axiosAuth.post(url);
  },
  getAllServer: () => {
    const url = `/server/list`;
    return axiosAuth.get(url);
  }
}

export default episodeApi;  