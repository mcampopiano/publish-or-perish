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
            <h2>Publication Magazines</h2>
            {
                magazines.map(mag => <Link key={mag.id} to={{pathname:`/magazines/${mag.id}`, state: {chosenMagazine: mag}}}>{mag.name}</Link>)
            }
            <button onClick={() => props.history.push("/magazines/create")}>Add magazine</button>
        </div>
    )
}