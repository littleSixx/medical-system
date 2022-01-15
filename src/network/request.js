import axios from 'axios'

export function request(config, success, failure) {
    const instance = axios.create({
        baseURL: 'http://localhost:8082/',
        timeout: 3000
    })

    instance(config)
    .then(res => {
        success(res)
    })
    .catch(err => {
        failure(err)
    })
}