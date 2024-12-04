import {apiClient} from "../interceptor/axiosInterceptor";
import {useState} from "react";

export const EmpsLoader = async() => {
    return await apiClient.get("/employee").then(res => (res.data));

}

