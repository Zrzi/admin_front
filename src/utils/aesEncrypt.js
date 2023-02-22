import CryptoJS from 'crypto-js';

/**
 * 随机生成16位aes密钥
 */
export function getKey() {
    let key = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let length = chars.length;
    for (let i=0; i<16; ++i) {
        key += chars.charAt(Math.floor(Math.random() * length));
    }
    return key;
}

// 加密
export function encrypt(key, data) {
    key = CryptoJS.enc.Hex.parse(key);
    let encrypted = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
}

// 解密
export function decrypt(key, word) {
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}