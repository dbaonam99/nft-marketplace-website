import axiosAuth from "./axiosAuth";

const subtitleApi = {
  getAll: (episodeId, data) => {
    const url = `/subtitle/${episodeId}/ajax`;
    return axiosAuth.post(url, data);
  },
  addItem: (episodeId, data) => {
    const url = `/subtitle/${episodeId}/upload/`;
    return axiosAuth.post(url, data, { "Content-Type": "multipart/form-data" });
  },
  editItem: (episodeId, id, data) => {
    const url = `/subtitle/${episodeId}/edit/${id}`;
    return axiosAuth.post(url, data, { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" });
  },
  deleteItem: (episodeId, id) => {
    const url = `/subtitle/${episodeId}/delete/${id}`;
    return axiosAuth.post(url);
  }
}

export default subtitleApi;  