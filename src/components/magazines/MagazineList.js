import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MagazineContext } from "./MagazineProvider"
import "./Magazine.css"

export const MagazineList = (props) => {
    // useContext is a react hook which allows me to get data stored in the Context component which is being passed in as an argument.On the left side of the = I am using object deconstruction to specify which components I need access to inside this component.
    const { magazines, getMagazines } = useContext(MagazineContext)

    // useEffect lets my call a function only after the initial render at page load. In React, if these functions run during the initial render phase it will cause bugs. The second argument 
    useEffect(() => {
        getMagazines()
    }, [])

    return (
        <div className="magazineSection">
            <h2 className="magazineHeader">Publication Magazines</h2>
            <div className="magazineList">
                {
                    // With this Link tag, from react-router-dom, I can pass an object as the value of the state property, which is itself property of the location property react router dom provides. This allows me to pass that data on so that I have access to it after following the Link. The Link elment itself in this case is making the name of each magazine in the magazines array a clickable link, which will then change the url to the specified pathname. In the applicationview component I am specifying what will be rendered to the DOM when this particular url is active.
                    magazines.map(mag => <Link className="magLink" key={mag.id} to={{ pathname: `/magazines/${mag.id}`, state: { chosenMagazine: mag } }}>{mag.name}</Link>)
                }
            </div>
        </div>
    )
}