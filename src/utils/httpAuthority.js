import axios from "axios";
import router from "../router";
import store from "../store"
import { ElMessage } from 'element-plus';

import getPublicKey from "@/utils/getPublicKey";
import {getKey, aesEncrypt} from "@/utils/aesEncrypt";
import {rsaEncrypt} from "@/utils/rsaEncrypt";

// 本地测试
const httpAuthority = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10 * 60 * 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});

// 线上测试
// const httpAuthority = axios.create({
//     baseURL: 'http://101.200.134.20:8080/authority',
//     timeout: 10 * 60 * 1000,
//     headers: {
//         "Content-Type": "application/json; charset=utf-8"
//     }
// });

httpAuthority.interceptors.request.use(async config => {
    config.headers['Authorization'] = localStorage.getItem("token");
    if (config.method !== 'post') {
        return config;
    }
    if (!config.headers['encrypted']) {
        return config;
    }
    const publicKey = await getPublicKey();
    let key = getKey();
    let encryptedKey = rsaEncrypt(publicKey, key);
    let data = aesEncrypt(key, JSON.stringify(config.data));
    config.data = {
        data: data,
        key: encryptedKey
    }
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
            return Promise.reject(response.data.message);
        } else if (res.code === 800003) {
            ElMessage({
                message: '用户无权限',
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
            return Promise.reject(response.data.message);
        } else if (res.code === 800006) {
            ElMessage({
                message: res.message,
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
            store.commit("RESET_STATE");
            router.push({path: '/login'});
            return Promise.reject(response.data.message);
        } else {
            ElMessage({
                message: res.message ? res.message : '系统异常',
                duration: 3 * 1000,
                type: 'error',
                center: true
            });
            return Promise.reject(response.data.message);
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