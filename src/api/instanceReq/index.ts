import { RequestHy } from '@/api/request'

export const myReq = new RequestHy({
    // baseURL: 'http://127.0.0.1:8080', // /Student/getStu  http://127.0.0.1:8080/  http://127.0.0.1:80/a/
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
