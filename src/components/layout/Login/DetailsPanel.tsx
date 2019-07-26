import * as React from "react";
import "./DetailsPanel.scss";

export class DetailsPanel extends React.Component<{}, {}> {
    render() {
        return (
            <div className="part detailspanel">
                <div className="detailspanel-content">
                    <h1>PS</h1>
                    <span>BR Editor</span>
                </div>
            </div>
        );
    }
}