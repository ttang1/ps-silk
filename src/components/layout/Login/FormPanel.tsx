import * as React from "react";
import "./FormPanel.scss";

export class FormPanel extends React.Component<{}, {}> {
    render() {
        return (
            <div className="part formpanel">
                <form className="formpanel-content">
                    <input type="text" placeholder="name"></input>
                    <input type="text" placeholder="email"></input>
                </form>
            </div>
        );
    }
}