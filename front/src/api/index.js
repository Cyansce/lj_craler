import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const http = axios.create({
  timeout: 5000,
  baseURL: baseUrl
})


export default http