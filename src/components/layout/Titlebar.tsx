import * as React from "react";
import "./Titlebar.scss";
export interface TitlebarProps {
    title: string;
}

export class Titlebar extends React.Component<TitlebarProps,{}> {
    render() {
        return (
            <div className="part titlebar">
                <div className="titlebar-drag"/>
            
                <div className="window-title">
                    {this.props.title}
                </div>

                <div className="window-controls">
                    <div className="window-icon" id="minimize-window">
                        <div className="icon icon-min"/>
                    </div>

                    <div className="window-icon" id="maximize-toggle-window">
                        <div className="icon icon-unmax icon-toggle"/>
                    </div>
                    
                    <div className="window-icon" id="close-window">
                        <div className="icon icon-close"/>
                    </div>
                </div>
            </div>
        );
    }
}