import React from "react";
import {render} from "react-dom";
import Favicon from "react-favicon";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./components/App";


render(
    <div>
        <Favicon url="https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-512.png" />
        <App/>
    </div>
    ,document.getElementById("root"));