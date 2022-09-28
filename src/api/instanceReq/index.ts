import { RequestHy } from '@/api/request'
import { encrypt } from '@/utils/storage/encry'
const env = import.meta.env

export const myReq = new RequestHy({
    baseURL: env.VITE_APP_BASE_API,
    timeout: 5000,
    interceptorsFn: {
        reqFn(config) {
            console.log('config', config)
            if (config.data) {
                config.data = encrypt(config.data)
            }
            return config
        },
        reqRejFn(err) {
            return err
        },
        resFn(res) {
            return res
        },
        resRejFn(err) {
            return err
        }
    }
})
