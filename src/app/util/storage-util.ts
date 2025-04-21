import { environment } from '../../environments/environment';
import { CryptoUtil } from './crypto-util';

export class StorageUtil {
    static set(key: string, value: any) {
        if (typeof value == 'object') value = JSON.stringify(value);                                // Converts to string if is not that type
        if (environment.production) value = CryptoUtil.encrypt(value, environment.crypt_key);     // Encrypts value if flag sent
        localStorage.setItem(key, value);                                                           // Stores value
    }

    static get(key: string) {
        let value = localStorage.getItem(key);
        if (value) {
            if (environment.production) value = CryptoUtil.decrypt(value, environment.crypt_key);

            try {
                return JSON.parse(value);
            } catch (error) {
                return value
                // throw new Error('[StorageUtil::get] No objsect');
            }

            // if (isString)
            //     return value;
            // else
            //     return JSON.parse(value);
        }
        // else
        //     throw new Error('[StorageUtil::get] No key/value found!');
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}