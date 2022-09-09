import { RequestHy } from '@/api/request'
const env = import.meta.env

export const myReq = new RequestHy({
    baseURL: env.VITE_APP_BASE_API,
    timeout: 5000,
    interceptorsFn: {
        reqFn(config) {
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
