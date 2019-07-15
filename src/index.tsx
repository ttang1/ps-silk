import * as React from "react";
import * as ReactDOM from "react-dom";

import { Titlebar } from "./components/layout/Titlebar/Titlebar"
import { Sidebar } from "./components/layout/Sidebar/Sidebar"
import "./index.scss"

class App extends React.Component<{},{}> {
    render() {
        return ([
            <Titlebar label="silk" />,
            <Sidebar/>
        ]);
    }
}

ReactDOM.render(<App/>, document.getElementById("silk-main"));