import { remote, BrowserWindow } from "electron";
import * as $ from "jquery";

import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap"
import "./login.scss"
import { Titlebar } from "./components/layout/Titlebar/Titlebar";

// Renderer
(() => {
    document.onreadystatechange = () => {
        let init = () => {
            let win: BrowserWindow = remote.getCurrentWindow();

            let togMax = () => {
                win.isMaximized() ?
                    $(".icon-toggle").removeClass("icon-max").addClass("icon-unmax") :
                    $(".icon-toggle").removeClass("icon-unmax").addClass("icon-max");
            }

            let minBtn = document.getElementById("minimize-window");
            let maxToggleBtn = document.getElementById("maximize-toggle-window");
            let closeBtn = document.getElementById("close-window");

            minBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.minimize();
            });

            maxToggleBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.isMaximized() ? win.unmaximize() : win.maximize();
            });

            closeBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.close();
            })

            togMax();
            win.on("maximize", togMax);
            win.on("unmaximize", togMax);
        }

        if (document.readyState == "complete") { init(); }
    }
})();

class Login extends React.Component<{}, {}> {
    render() {
        return ([
            <Titlebar label="silk | login" />
        ]);
    }
}

ReactDOM.render(<Login />, document.getElementById("silk-login"));