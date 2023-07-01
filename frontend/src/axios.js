import axios from "axios";

const instance = axios.create({
    baseURL: "https://earthypaving.onrender.com/",
});

export default instance;
