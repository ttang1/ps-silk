import * as React from "react";
import "./FormPanel.scss";
import { ipcRenderer } from "electron";

export interface FormProps {
    placeholder?: string;
}

export class FormPanel extends React.Component<{}, {}> {
    private handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        let inputData = document.querySelector('input');
        console.log(inputData.value);
        ipcRenderer.send("register:Email", inputData.value);
    }

    render() {
        return (
            <div className="part formpanel">
                <form className="formpanel-content" onSubmit={this.handleRegisterSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" aria-label="Email" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-silk">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}