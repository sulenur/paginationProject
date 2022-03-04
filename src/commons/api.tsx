import axios from "axios";

import { DiscoveryRequestModel } from "../models/RequestModel";



const instance = axios.create({
    baseURL: "https://api.github.com/"
});


export const getSearchUsers = async (params : DiscoveryRequestModel) => {


    const response = await instance.get('/search/users',{
        params : {...params,q: params.q  }
    });
    return response;
};

export const getUsers = async ({since, per_page } : {since : number, per_page : number}) => {
    const response = await instance.get('users',{
        params : {
            since,
            per_page
        }
    });
    return response;
};


export const getSelectedUser = async ({params}) => {
    const response = await instance.patch('/user',{
        params : params
    });
    response.data.headers['Content-Type'];
    return response;
};



export default instance;