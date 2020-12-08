import React from "react"
import { Magazine } from "./Magazine"

export const MagazineDetail = (props) => {
    return (
        <>
        <header className="magDetailsTitle">
        <h2 className="magDetailsTitle">{props.location.state.chosenMagazine.name}</h2>
        </header>                
                <Magazine mag={props.location.state.chosenMagazine} {...props}/>
                <button onClick={() => props.history.push("/")}>Dashboard</button>
        </>
    )
}