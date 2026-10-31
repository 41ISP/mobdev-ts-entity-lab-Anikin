import { create } from "zustand"
import { api } from "./api"
import { IDrone, IDroneInput } from "./types"
import axios from "axios"

interface IDroneStore 
{
    drones: IDrone[]
    isLoading: boolean
    error: string | null
    getDrones: () => Promise<void>
    addDrone: (data: IDroneInput) => Promise<void>
    removeDrone: (documentId: string) => Promise<void>
}

export const useDroneStore = create<IDroneStore>((set, get) => (
{
    drones: [],
    isLoading: false,
    error: null,

    getDrones: async () => {
        set(
        { 
            isLoading: true, error: null 
        })
        try 
        {
            const drones = await api.getDrones()
            set(
            {
                drones 
            })
        } catch (error) 
        {
            const msg = axios.isAxiosError(error) 
                ? error.response?.data?.error?.message 
                : "Не удалось загрузить список"
            set(
            { 
                error: msg 
            })
        } finally {
            set(
            { 
                isLoading: false 
            })
        }
    },

    addDrone: async (data) => 
    {
        set(
        { 
            error: null
        })
        try 
        {
            await api.createDrone(data)
            await get().getDrones() // Обновляем список
        } catch (error) {
            const msg = axios.isAxiosError(error) 
                ? error.response?.data?.error?.message 
                : "Не удалось создать запись"
            set(
            { 
                error: msg
            })
            throw new Error(msg)
        }
    },

    removeDrone: async (documentId) => 
    {
        try 
        {
            await api.deleteDrone(documentId)
            await get().getDrones() 
        } catch (error) 
        {
            console.error("Ошибка удаления", error)
        }
    }
}))