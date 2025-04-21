import * as CryptoJS from 'crypto-js';
// import BCrypt from 'bcryptjs';
// import { environment } from '../../environments/environment';

export class CryptoUtil {
    static decrypt(keyword: string, nonce: string) {
        const decrypted_password_bytes = CryptoJS.AES.decrypt(keyword, nonce);
        const decrypted_password_string = decrypted_password_bytes.toString(CryptoJS.enc.Utf8);
        return decrypted_password_string;
    }
    /**
      * AES Algorithm to encrypt keyword with nonce
     * @param keyword
     * @param nonce
     */
    static encrypt(keyword: string, nonce: string) {
        const encrypted_password_bytes = CryptoJS.AES.encrypt(keyword, nonce);
        const encrypted_password_string = encrypted_password_bytes.toString();
        return encrypted_password_string;
    }
}