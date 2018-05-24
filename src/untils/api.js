import axios from 'axios'

export default axios.create({
    baseURL: ' https://leaderboard.lp1.eu/api/json',
    headers: {
        Authorization: localStorage.getItem('token')
    }
})