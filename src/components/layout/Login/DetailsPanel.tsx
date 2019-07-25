import * as React from "react";
import "./DetailsPanel.scss";

export class DetailsPanel extends React.Component<{}, {}> {
    render() {
        return (
            <div className="part details-panel">
                <h1>Silk</h1>
                <span>BR Editor</span>
            </div>
        );
    }
}