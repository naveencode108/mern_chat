import axios from 'axios'

const instance=axios.create({
    baseURL:import.meta.env.MODE==='development'?'http://localhost:3000':''
})

export default instance;