import * as React from "react";
import * as ReactDOM from "react-dom";

import { Titlebar } from "./components/layout/Titlebar"
import "./index.scss"

class App extends React.Component<{},{}> {
    render() {
        return ([
            <Titlebar title="silk" />
        ]);
    }
}

ReactDOM.render(<App/>, document.getElementById("silk-main"));