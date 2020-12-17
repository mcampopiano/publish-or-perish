import React from "react"
import { MagazineList } from "./magazines/MagazineList"
import { StoryList } from "./stories/StoryList"
import "./Dashboard.css"
import Typed from "typed.js"


    export class Dashboard extends React.Component {
        componentDidMount() {
            // If you want to pass more options as props, simply add
          // your desired props to this destructuring assignment.
          const { strings } = this.props;
          // You can pass other options here, such as typing speed, back speed, etc.
          const options = {
              strings: strings,
            typeSpeed: 100,
            backSpeed: 100
          };
          // this.el refers to the <span> in the render() method
          this.typed = new Typed(this.el, options);
        }
      
        componentWillUnmount() {
            // Make sure to destroy Typed instance on unmounting
          // to prevent memory leaks
          this.typed.destroy();
        }
      
        render(props) {
          return (
            <div className="wrap">
              <div className="type-wrap">
                <span
                  style={{ whiteSpace: 'pre' }}
                  ref={(el) => { this.el = el; }}
                />
                <div className="dashboard">
                <MagazineList {...props} />
                <StoryList {...props} />
            </div>
              </div>
            </div>
          );
        }
      }
      
    
