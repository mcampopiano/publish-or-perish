import React from "react"
import { Magazine } from "./Magazine"

export const MagazineDetail = (props) => {
    return (
        <div className="magazineCard">

    <h2 className="magDetailsTitle">{props.location.state.chosenMagazine.name}</h2>
    <Magazine mag={props.location.state.chosenMagazine}/>
    </div>
    )
}