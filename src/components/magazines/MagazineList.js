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
            {/* the onClick function takes a callback function as an argument. In this case I am passing an anonymous function so I can use the props.history.push method. the history property has value which is an array of the url's used, and the browser will display whatever is last in the array. Therefore, pushing a new url into the array will change the url in the browser. */}
            <div className="btnDiv" id="magListBtn">
                <button onClick={() => props.history.push("/magazines/create")}>Add magazine</button>
            </div>
        </div>
    )
}