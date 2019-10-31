import axios from 'axios'

export default function(config){
  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/v1',
    timeout:5000
  });

    instance.interceptors.response.use(res=>{
      return res.data
    },err=>{
      console.log(err)
    })

  return instance(config)
}