import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const signup = (data) => {
  return axios.post(`${API}/signup`, data);
};

export const verifyOtp = (email, otp) => {
  return axios.post(`${API}/verify-otp`, {
    email,
    otp,
  });
};

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};