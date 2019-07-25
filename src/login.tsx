import { remote, BrowserWindow } from "electron";
import * as $ from "jquery";

import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap"
import "./login.scss"
import { DetailsPanel } from "./components/layout/Login/DetailsPanel";

// Renderer
(() => {
    document.onreadystatechange = () => {
        let init = () => {
            let win: BrowserWindow = remote.getCurrentWindow();

            let closeBtn = document.getElementById("close-window");

            closeBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.close();
            })
        }

        if (document.readyState == "complete") { init(); }
    }
})();

class Login extends React.Component<{}, {}> {
    render() {
        return ([
            <DetailsPanel/>
        ]);
    }
}

ReactDOM.render(<Login />, document.getElementById("silk-login"));