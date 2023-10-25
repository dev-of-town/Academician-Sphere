import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  headers: {
    'Access-Control-Allow-Origin' : '*',
  },
  baseURL: "http://localhost:4041",
});

export default API;