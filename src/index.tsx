import { remote, BrowserWindow } from "electron";
import * as $ from "jquery";

import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap"
import "./index.scss"
import { Titlebar } from "./components/layout/Titlebar/Titlebar";
import { Sidebar } from "./components/layout/Sidebar/Sidebar";
import { Minibar } from "./components/layout/Minibar/Minibar";
import { Detailscolumn } from "./components/layout/Detailscolumn/Detailscolumn";
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Statusbar } from "./components/layout/Statusbar/Statusbar";
import { inherits } from "util";

// Renderer
(() =>{
    document.onreadystatechange = () => {
        let init = () => {
            let win: BrowserWindow = remote.getCurrentWindow();
            
            let togMax = () => {
                win.isMaximized()?
                    $(".icon-toggle").removeClass("icon-max").addClass("icon-unmax"):
                    $(".icon-toggle").removeClass("icon-unmax").addClass("icon-max");
            }

            let minBtn = document.getElementById("minimize-window");
            let maxToggleBtn = document.getElementById("maximize-toggle-window");
            let closeBtn = document.getElementById("close-window");

            minBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.minimize();
            });

            maxToggleBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.isMaximized()?win.unmaximize():win.maximize();
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








class App extends React.Component<{},{}> {
    render() {
        return ([
            <Sidebar/>,
            <Detailscolumn/>,
            <Minibar/>,
            <Navbar/>,
            <Statusbar/>,
            <Titlebar label="silk"/>
        ]);
    }
}

ReactDOM.render(<App/>, document.getElementById("silk-main"));