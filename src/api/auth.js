import apiClient from "./client";

export const registerUser = (email, password) =>
  apiClient.post("/auth/register", { email, password }).then((res) => res.data);

export const loginUser = (email, password) => {
  // The backend's /auth/login endpoint is an OAuth2 password flow, which
  // expects form-encoded "username" + "password", not JSON.
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  return apiClient
    .post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => res.data);
};

export const fetchCurrentUser = () =>
  apiClient.get("/users/me").then((res) => res.data);
