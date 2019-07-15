import * as React from "react";
import "./TitlebarButton.scss";

export interface TitlebarButtonProps {
    id: string;
    iconClass: string;
}

export class TitlebarButton extends React.Component<TitlebarButtonProps, {}> {
    render() {
        return (
            <div className="titlebar-button" id={this.props.id}>
                <div className={this.props.iconClass} />
            </div>
        );
    }
}