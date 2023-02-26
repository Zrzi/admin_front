import CryptoJS from 'crypto-js';

/**
 * 随机生成16位aes密钥
 */
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
const length = chars.length;

export function getKey() {
    let key = '';
    for (let i=0; i<16; ++i) {
        key += chars.charAt(Math.floor(Math.random() * length));
    }
    return key;
}

// 加密
export function aesEncrypt(key, data) {
    key = CryptoJS.enc.Utf8.parse(key);
    let srcs = CryptoJS.enc.Utf8.parse(data);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

// 解密
export function aesDecrypt(key, word) {
    key = CryptoJS.enc.Utf8.parse(key);
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}