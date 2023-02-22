import {JSEncrypt} from "jsencrypt";

// 加密aes密钥
export function rsaEncrypt(key, data) {
    let jsencrypt = JSEncrypt();
    jsencrypt.setPublicKey(key);
    return jsencrypt.encrypt(data);
}