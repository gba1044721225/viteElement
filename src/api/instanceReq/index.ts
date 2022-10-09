import { RequestHy } from '@/api/request'
import { encrypt, decrypt } from '@/utils/storage/encry'
const env = import.meta.env

export const myReq = new RequestHy({
    baseURL: env.VITE_APP_BASE_API,
    timeout: 20000,
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
            // console.log('res', res)
            if (res.data) {
                Object.keys(res.data).forEach((v) => {
                    // console.log('v', v)
                    if (res.data[v]) res.data[v] = JSON.parse(decrypt(res.data[v]))
                })
            }
            // console.log('res.data', res.data)
            // console.log('res.meta', res.data.meta)
            // console.log('res.data.data', res.data.data)
            // console.log(JSON.parse(res.data.data))
            return res
        },
        resRejFn(err) {
            console.log('err', err)
            return err
        }
    }
})
