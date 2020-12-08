import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MagazineContext } from "./MagazineProvider"

export const MagazineList = (props) => {
    const {magazines, getMagazines} = useContext(MagazineContext)

    useEffect(() => {
        getMagazines()
    }, [])

    return (
        <div className="magazineList">
            {
                magazines.map(mag => <Link key={mag.id} to={`/magazine/${mag.id}`}>{mag.name}</Link>)
            }
            <button onClick={() => props.history.push("/magazines/create")}>Add magazine</button>
        </div>
    )
}