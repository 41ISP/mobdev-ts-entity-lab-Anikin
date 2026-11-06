import { getImageUrl } from "../api"
import type { IDrone } from "../types"
import {useDroneStore} from "../store"


interface Props 
{
    drone: IDrone
}
export function DroneCard ({drone}: Props) {
    return (
        <article className="card">
            <div className="card__cover"> 
                {drone.image ? (
                    <img 
                    src={getImageUrl(drone.image.url)} 
                    alt={drone.image.alternativeText ?? drone.droneName}/>
                ) : (
                    <span>
                        {drone.droneName.charAt(0)}
                    </span>
                    )}
                  {drone.height && <b className="card__badge">{drone.height} см</b>}
            </div>
            <div 
            className="card__body">
                <h3>
                    {drone.droneName}
                </h3>
                
                {drone.description &&
                    <p className="card__desc"> 
                    {drone.description}
                    </p>
                }

                <p 
                className="card__meta">Тип: {drone.droneType || "Неизвестен"}
                </p>
                <p 
                className="card__meta">Статус: drone.droneStatus
                </p>
                <p 
                className="card__meta">Использует наниты: drone.naniteUse
                </p> 
                
                <div 
                className='chips'>
                    {drone.ability?.map((a) => (
                        <span key={a} className="chip"> 
                        {a}
                        </span>
                    ))}
                </div>
            </div>
            <footer 
            className="card__footer">
                <button
                    className='link-btn'
                    onClick={() => removeDrone(drone.documentId)}
                    >
                    Удалить
                </button>
            </footer>
        </article>
    )
}