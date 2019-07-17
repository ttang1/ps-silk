import * as React from "react";
import "./Navbar.scss";


export class Navbar extends React.Component<{}, {}> {
    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        let file: File = document.querySelector('input').files[0];

        console.log(file.name);
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
                </div>
                <div className="navbar-user-profile"> </div>
            </div>
        );
    }
}