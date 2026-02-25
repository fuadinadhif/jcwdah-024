import axios from "axios";

export const apiClient = axios.create({ baseURL: "http://localhost:8888/api" });

apiClient.interceptors.request.use((config) => {
  console.log(config);

  const authStore = JSON.parse(localStorage.getItem("auth-store")!);

  if (!authStore) {
    return config;
  }

  const accessToken = authStore.state.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// NOTES
// await fetch("http://localhost:8000/api/auth/register", {
//   method: "POST",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify({ email: "", password: "" }),
// });

// await axios.post("http://localhost:8000/api/auth/register", {
//   email: "",
//   password: "",
// });
