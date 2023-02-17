import axios from "axios";
import router from "../router";
import { ElMessage } from 'element-plus';

const httpAuthority = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10 * 60 * 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});

httpAuthority.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token");
    return config;
})

httpAuthority.interceptors.response.use(response => {
        let res = response.data;
        if (res.code === 200) {
            return Promise.resolve(response);
        } else if (res.code === 800002) {
            ElMessage({
                message: '用户未登录',
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
            router.push("/login");
            return Promise.reject(response.data.message)
        } else if (res.code === 800003) {
            ElMessage({
                message: '用户无权限',
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
            return Promise.reject(response.data.message)
        } else {
            ElMessage({
                message: res.message ? res.message : '系统异常',
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
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
        ElMessage({
            message: error.message,
            duration: 3 * 1000,
            type: 'error',
            center: true
        });
        return Promise.reject(error);
    }
)

export default httpAuthority;