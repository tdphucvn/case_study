import axios from 'axios';

const localHostURL = 'http://localhost:5000';

export const loginRequest = async (username: string, password: string) => {
    return axios.post(`/api/v1/authentication/login`, {username, password}, {withCredentials: true})
      .then(res => ({
        data: res.data,
        status: res.status,
      }))
      .catch(error => {
        if(error.response) {
          return ({
            data: error.response.data,
            status: error.response.status,
          });
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error(error.message);
        };
      });
};

export const registerRequest = async (username: string, password: string, email: string, firstName: string, lastName: string) => {
    return axios.post(`/api/v1/authentication/signup`, {username, password, email, firstName, lastName}, {withCredentials: true})
      .then(res => ({
        data: res.data,
        status: res.status,
      }))
      .catch(error => {
        if(error.response) {
          return ({
            data: error.response.data,
            status: error.response.status,
          });
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error(error.message);
        };
      });
};

export const logoutRequest = async () => {
  return axios.delete(`/api/v1/authentication/logout`, {withCredentials: true})
    .then(res => ({
      data: res.data,
      status: res.status,
    }))
    .catch(error => {
      if(error.response) {
        return ({
          data: error.response.data,
          status: error.response.status,
        });
      } else if (error.request) {
        throw new Error(error.request);
      } else {
        throw new Error(error.message);
      };
    });
};
