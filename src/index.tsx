import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.scss"
import { Titlebar } from "./components/layout/Titlebar/Titlebar";
import { Sidebar } from "./components/layout/Sidebar/Sidebar";
import { Minibar } from "./components/layout/Minibar/Minibar";
import { Detailsbar } from "./components/layout/Detailsbar/Detailsbar";
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Statusbar } from "./components/layout/Statusbar/Statusbar";

class App extends React.Component<{},{}> {
    render() {
        return ([
            <Sidebar/>,
            <Detailsbar/>,
            <Minibar/>,
            <Navbar/>,
            <Statusbar/>,
            <Titlebar label="silk"/>
        ]);
    }
}

ReactDOM.render(<App/>, document.getElementById("silk-main"));