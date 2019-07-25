import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap"
import "./load.scss"

class Load extends React.Component<{}, {}> {
    render() {
        return (
            <div className="icon-container"> 
                <div className="ps-icon"/>
            </div>
        );
    }
}

ReactDOM.render(<Load />, document.getElementById("silk-load"));