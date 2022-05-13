import { axiosConfig as axios } from "@/services/axios";
import { LossData } from "@/interfaces";


const getLosses = async (type: string) => 
    await axios.get(`/data/` + type);

const createLoss = async (type: string, device: LossData) => 
    await axios.post(`/data/` +type, device);

const updateLoss =async (type: string, device: LossData) => 
    await axios.put(`/data/` + type, device);

const deleteLoss = async (type: string, date: string) => 
    await axios.delete(`/data/` + type, { params: { date: date } });

    
export { getLosses, createLoss, updateLoss, deleteLoss };