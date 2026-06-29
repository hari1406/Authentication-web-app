import axios from "axios";

const API = "https://authentication-backend-production-6791.up.railway.app/api/auth";

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