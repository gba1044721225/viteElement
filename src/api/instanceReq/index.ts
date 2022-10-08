import { RequestHy } from '@/api/request'
import { encrypt, decrypt } from '@/utils/storage/encry'
const env = import.meta.env

export const myReq = new RequestHy({
    baseURL: env.VITE_APP_BASE_API,
    timeout: 5000,
    interceptorsFn: {
        reqFn(config) {
            if (config?.data) {
                Object.keys(config.data).forEach((v) => {
                    config.data[v] = encrypt(config.data[v])
                })
                // console.log(config.data)
                // console.log(config)
            }
            return config
        },
        reqRejFn(err) {
            return err
        },
        resFn(res) {
            // res.data = decrypt(res.data)

            if (res.data) {
                Object.keys(res.data).forEach((v) => {
                    res.data[v] = decrypt(res.data[v])
                })
            }
            // console.log('res.data', res.data)
            // console.log('res.meta', res.data.meta)
            // console.log('res.data.data', res.data.data)

            return res
        },
        resRejFn(err) {
            return err
        }
    }
})
