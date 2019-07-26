import * as React from "react";
import "./Navbar.scss";
import { ipcRenderer } from "electron";

export class Navbar extends React.Component<{}, {}> {
    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        let file: File = document.querySelector('input').files[0];
        const { path } = document.querySelector('input').files[0];
        

        console.log(file);

        ipcRenderer.send("json:submit", path);

        ipcRenderer.on("json:receive", (event: any, fn: string, ln: string) => {
            document.querySelector(".titlebar-label").innerHTML = `${fn} ${ln}`;
        });
    }

    private handleReset = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        ipcRenderer.send("reset:userPref");
    }


    render() {
        return (
            <div className="part navbar">
                <div className="navbar-client-profile"></div>
                <div className="navbar-actions">
                    <form onSubmit={this.handleSubmit}>
                        <label>Select a file</label>
                        <input type="file" accept=".json" />
                        <button type="submit">Add</button>
                    </form>

                    <h1 id="result"></h1>
                </div>
                <div className="navbar-user-profile"> 
                    <form onSubmit={this.handleReset}>
                        <button type="submit">Reset</button>
                    </form>
                    <span id="userEmail"></span>
                    <span id="userAccess"></span>
                </div>
            </div>
        );
    }
}