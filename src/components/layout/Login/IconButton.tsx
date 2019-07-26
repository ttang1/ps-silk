import * as React from "react";
import "./IconButton.scss";

export interface IconButtonProps {
    id: string;
    iconClass: string;
}

export class IconButton extends React.Component<IconButtonProps, {}> {
    render() {
        return (
            <div className="icon-button" id={this.props.id}>
                <div className={this.props.iconClass} />
            </div>
        );
    }
}