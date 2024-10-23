import axios from "axios";

export const fetchImages = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: import.meta.env.VITE_API_KEY
  }
});
