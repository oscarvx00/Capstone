import { axiosConfig as axios } from "@/services/axios";
import { User } from "@/interfaces";

const register = async (user: User) => 
    await axios.post(`/register`, user);

const login = async (user: User) => 
    await axios.post(`/token/sign`, user);


export { register, login };