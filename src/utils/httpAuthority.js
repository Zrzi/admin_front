import axios from "axios";
import router from "../router";
import { ELMessage } from 'element-plus';

const API = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 2000,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});

API.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token");
    return config;
})

API.interceptors.response.use(response => {
        let res = response.data;
        if (res.code === 200) {
            return response
        } else {
            ELMessage({
                message: res.message ? res.message : '系统异常',
                duration: 3 * 1000,
                type: 'error',
                center: true
            })
            return Promise.reject(response.data.message)
        }
    },
    error => {
        if (error.response.data) {
            error.message = error.response.data.message
        }
        if (error.response.status === 401) {
            router.push("/login");
        }
        ELMessage({
            message: error.message,
            duration: 3 * 1000,
            type: 'error',
            center: true
        })
        return Promise.reject(error)
    }
)

export default httpAuthority;