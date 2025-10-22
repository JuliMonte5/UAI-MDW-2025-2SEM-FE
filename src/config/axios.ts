import axios from "axios";

const jsonplaceholderInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
});

export { jsonplaceholderInstance };
