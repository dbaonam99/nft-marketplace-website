import axiosAuth from "./axiosAuth";

const analyticsService = {
  getAll: () => {
    const url = "analytics";
    return axiosAuth.get(url);
  },
}

export default analyticsService;