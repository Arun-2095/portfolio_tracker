import axios from "axios";

const AXIOS = (auth = false) => {
  const AxiosInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
    timeout: 2000,
  });

  // Add a response interceptor
  AxiosInstance.interceptors.request.use((request) => {
    return request;
  });

  // Add a response interceptor
  AxiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // handle 401 response
      if (error.response === undefined) {
        error.message = "Network error. Try again after sometime.";
      }
      return Promise.reject(error);
    }
  );
};

 function apiCall(config={}) {

  let { method, endpoint, body, params }= config 
  return new Promise(async (resolve, reject) => {

    let AxiosInstance = AXIOS();

     return AxiosInstance[method](endpoint, body, params)
       .then((res) => {
         resolve(res);
       })
       .catch((error) => {
         reject(error);
       });
     
  });
}