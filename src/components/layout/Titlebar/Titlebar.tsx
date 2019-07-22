import * as React from "react";
import "./Titlebar.scss";
import "./TitlebarButton";
import "./AppLogo";
import { TitlebarButton } from "./TitlebarButton";
import { AppLogo } from "./AppLogo";

export interface TitlebarProps {
    label: string;
}

export class Titlebar extends React.Component<TitlebarProps,{}> {
    render() {
        return (
            <div className="part titlebar">
                <div className="titlebar-drag"/>

                <AppLogo iconClass="icon icon-pslogo"/>

                <div className="titlebar-label"> {this.props.label} </div>

                <div className="titlebar-controls">
                    <TitlebarButton id="minimize-window" iconClass="icon icon-min" />
                    <TitlebarButton id="maximize-toggle-window" iconClass="icon icon-unmax icon-toggle" />
                    <TitlebarButton id="close-window" iconClass="icon icon-close" />
                </div>
            </div>
        );
    }
}