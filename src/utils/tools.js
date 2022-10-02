import axios from "axios";

// Setting lấy từ bài học
export const config = {
  setCookie: (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  clearStore: (name) => {
    localStorage.clear(name);
  },

  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};

export const {
  setCookie,
  getCookie,
  getStore,
  setStoreJson,
  getStoreJson,
  clearStore,
  USER_LOGIN,
  ACCESS_TOKEN,
} = config;

const DOMAIN = 'https://shop.cyberlearn.vn/api'
const CYBER_SOFT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU'

export const axiosTimeout = axios.create({
  baseURL: DOMAIN,
  timeout: 30000
})



axiosTimeout.interceptors.request.use(
  (config) => {
    const token = getStoreJson(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosTimeout.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // const originalRequest = err.config;
    if (err.response.status === 400 || err.response.status === 404) {
      // history.push("/register");
      return Promise.reject(err);
    }
    // console.log(err.response);
    if (
      err.response.status === 0 ||
      err.response.status === 401 ||
      err.response.status === 403
    ) {
      clearStore(ACCESS_TOKEN);
      return Promise.reject(err);
    }
  }
);