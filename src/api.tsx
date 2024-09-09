import axios from "axios";

export const api = axios.create({
  baseURL: "https://8b3420317d20.vps.myjino.ru/api/",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post("/token/refresh/", {
          refresh: localStorage.getItem("refresh_token"),
        });
        localStorage.setItem("access_token", response.data.access);
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., logout user)
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        if (window.location.pathname !== "/auth") {
          window.location.href = "/auth";
        }
      }
    }
    return Promise.reject(error);
  },
);
