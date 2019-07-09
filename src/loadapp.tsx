import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
// import { Titlebar } from "./components/layout/Titlebar"


class Splash extends React.Component<{}, {}> {
    render() {
        return (
            <body>
                <Hello />
            </body>
        );
    }
}

// class App extends React.Component<{}, {}> {
//     render() {
//         return (
//             <body>
//                 <Titlebar title="silk" />

//             </body>
//         );
//     }
// }

ReactDOM.render(
    <Splash/>,
    document.getElementById("splash")
);

// ReactDOM.render(
//     <App />,
//     document.getElementById("silk")
// );

