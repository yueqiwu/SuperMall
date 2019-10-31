import Axios from "axios";

export function request(config) {
    const instance = Axios.create({
        baseURL: 'http://106.54.54.237:8000/api/v1',
        timeout: 5000,
    });

     instance.interceptors.request.use(config=>{
         console.log(config);
         return config;//放行
     },err=>{
         console.log(err)
     });
     instance.interceptors.response.use(data=>{
         return data
     },err=>{
         console.log(err)
     })

    return instance(config).then(res=>{
        return res.data.data;
    })

    // const aa = Axios({
    //     url:'http://123.207.32.32:8000/api/v1/home/multidata'
    // })
    // aa.interceptors.request.use(config=>{
    //     console.log(config);
    //     return config
    // })

    // return aa
}

// export function request(config) {
//     return new Promise((resolve, reject) => {
//         const instance = Axios.create({
//             baseURL: 'http://123.207.32.32:8000/api/v1',
//             timeout: 5000
//         });
//         instance(config)
//             .then(res => {
//                 resolve(res);
//             },err=>{
//                 reject(err)
//             });
//     })
// }
