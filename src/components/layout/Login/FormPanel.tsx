import * as React from "react";
import "./FormPanel.scss";

export interface FormProps {
    placeholder?: string;
}


export class FormPanel extends React.Component<{}, {}> {
    render() {
        return (
            <div className="part formpanel">
                <form className="formpanel-content">
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" aria-label="Email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-dark">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}