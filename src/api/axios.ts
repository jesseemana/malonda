import axios from 'axios'
// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL
export default axios.create({ baseURL: BASE_URL })
