import * as React from "react";
import "./AppLogo.scss";

export interface LogoProps {
    id?: string;
    iconClass: string;
}

export class AppLogo extends React.Component<LogoProps, {}> {
    render() {
        return (
            <div className="titlebar-app-icon">
                <div className={this.props.iconClass} />
            </div>
        );
    }
}