// 7e4cacb01df272f108bcf4f9382ffbda
// /movie/now_playing?api_key=28fc232cc001c31

import axios  from 'axios'
const api =  axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export default api
