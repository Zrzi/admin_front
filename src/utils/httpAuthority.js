import axios from "axios";
import router from "../router";
import store from "../store"
import { ElMessage } from 'element-plus';

import getPublicKey from "@/utils/getPublicKey";
import {getKey, aesEncrypt} from "@/utils/aesEncrypt";
import {rsaEncrypt} from "@/utils/rsaEncrypt";

// 本地测试
// const httpAuthority = axios.create({
//     baseURL: 'http://localhost:8000',
//     timeout: 10 * 60 * 1000,
//     headers: {
//         "Content-Type": "application/json; charset=utf-8"
//     }
// });

// 线上测试
const httpAuthority = axios.create({
    baseURL: 'http://101.200.134.20:8080/authority',
    timeout: 10 * 60 * 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});

// 是否正在刷新token
let isRefreshing = false;
// 重新发起请求队列
let requests = [];

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

httpAuthority.interceptors.response.use(async response => {
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
        localStorage.clear();
        sessionStorage.clear();
        store.commit("RESET_STATE");
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
        localStorage.clear();
        sessionStorage.clear();
        store.commit("RESET_STATE");
        router.push({path: '/login'});
        return Promise.reject(response.data.message);
    } else if (res.code === 800007) {
        // token 过期
        let config = response.config;
        if (isRefreshing) {
            // 已经有在刷新token了
            return new Promise((resolve) => {
                requests.push((token) => {
                    config.headers['Authorization'] = token;
                    resolve(httpAuthority(config));
                });
            });
        } else {
            isRefreshing = true;
            let refreshToken = store.state.refreshToken;
            if (!refreshToken) {
                refreshToken = localStorage.getItem("refreshToken");
            }
            let refreshTokenForm = {
                refreshToken: refreshToken
            }
            try {
                const res = await httpAuthority.post('/refreshToken', refreshTokenForm);
                const response = res.data;
                // 其它情况，系统没能刷新token
                if (response.code === 200) {
                    let token = response.data.token;
                    let refreshToken = response.data.refreshToken;
                    store.commit('SET_TOKENS', token);
                    store.commit('SET_REFRESH_TOKEN', refreshToken);
                    config.headers['Authorization'] = token;
                    requests.forEach(cb => cb(token));
                    requests = [];
                    try {
                        const tempResponse = await httpAuthority(config);
                        return Promise.resolve(tempResponse);
                    } catch (message) {
                        return Promise.reject(message);
                    }
                }
            } finally {
                isRefreshing = false;
            }
        }
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
});

export default httpAuthority;