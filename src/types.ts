export const DRONE_TYPES = ['Zombie-drone', 'Disassembly-drone', 'Worker-drone'] as const
export type DroneType = (typeof DRONE_TYPES)[number]

export const DRONE_STATUSES = ['active', 'notActive', 'destroyed'] as const
export type DroneStatus = (typeof DRONE_STATUS)[number]

export const ABILITIES = ["Null", "Hologram", "Telekinesis", "CallBackPing", "Claws", "Wings", "Weapons", "Rail-gun", "Plot Armor", "Resistance to solver"] as const
export type Ability = (typeof ABILITIES)[number]

export interface IMedia 
{
    id: number
    url: string
    alternativeText: string | null
}

export interface IDrone 
{
    id: number
    documentId: string
    droneName: string
    droneType: DroneType | null
    droneStatus: DroneStatus | null
    naniteUse: boolean | null
    height: number | null
    image: IMedia | null
    ability: string[] | null
    description: string | null
}
export type IDroneInput = Omit<
    IDrone,
    "id" | "documentId" | "image"
>

export interface IStrapiResponse<T> 
{
    data: T
    meta: any
}