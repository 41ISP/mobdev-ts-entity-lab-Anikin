import {axios} from 'axios'
import {IDrone, IDroneInput, IStrapiResponse} from './tipes'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create(
{
    baseURL: `${API_URL}/api`,
    headers: 
    {
        Authorization: `Bearer ${API_KEY}`,
    },
})

export const getImageUrl = (url: string) => `${API_URL}${url}`

export const api = 
{
    getDrones: async () => 
    {
        const res = await apiInstance.get<IStrapiResponse<IDrone[]>>("/drones?populate=*")
        return res.data.data
    },
    createDrone: async (data: IDroneInput) => 
    {
        const res = await apiInstance.post<IStrapiResponse<IDrone>>("/drones", { data })
        return res.data.data
    },
    deleteDrone: async (documentId: string) => 
    {
        await apiInstance.delete(`/drones/${documentId}`)
    },
}