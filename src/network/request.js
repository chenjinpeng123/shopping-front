import axios from "axios";

export default function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://localhost:8084',
        method: "post"||"get"
    })

    // 响应拦截器
    instance.interceptors.response.use(function (res) {
        return res.data
    }, function (err) {
        return err
    })

    // 发送真正的网络请求
    return instance(config)
}