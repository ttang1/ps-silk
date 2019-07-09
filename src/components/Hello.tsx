import * as React from "react";
import "./Hello.scss";

export class Hello extends React.Component<{}, {}> {
    render() {
        return (
            <div className="icon-container">
                <div className="ps-icon"></div>
            </div>
        );
    }
}