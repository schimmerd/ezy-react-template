import axios from "axios"

class API {
    constructor(baseUrl) {
        this.client = axios.create({ baseURL: baseUrl })
    }

    getSamples () {
        return this.client.get('samples')
    }

    postSamples (data) {
        return this.client.post('samples', data)
    }
}

export default new API('https://sample-api/api/v1/')