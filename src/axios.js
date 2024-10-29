import axios from 'axios';

export const baseUrl = 'https://api.fitnessbyfaith.org/';

const instance = axios.create({
  baseURL: baseUrl, 
});

instance.interceptors.request.use((request) => {

  let token = localStorage.getItem('token')
  request.headers = {
    'Accept': "application/json, text/plain, */*",
    'Authorization': `Bearer ${token}`,
  }
  return request
});

instance.interceptors.response.use((response) => {
  if(response?.data?.status === 401){
    localStorage.clear()
    window.location.href="/login"
  }
  else{
    if (response) {
      return response
    }
  }
}, function (error) {
  console.log("🚀 ~ instance.interceptors.response.use ~ error:", error)
  // *For unAuthorized 
  // if (error.response.status === 401) {
  //   localStorage.clear()
  // }
  return Promise.reject(error);
});

export default instance;