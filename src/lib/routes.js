import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Root from "components/homepage/home";
import Snake from "components/snake";
import SnakeLB from "components/snakeLB";
import Term from "components/terminal/term";
import { createBrowserRouter} from "react-router-dom";


export const ROOT = "/";
export const TERM = "/terminal";
export const SNAKE = "/snake";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const SNAKELB = "/snake/leaderboard";

export const router = createBrowserRouter([
    { path: ROOT, element: <Root/> },
    { path: TERM, element: <Term/>},
    { path: SNAKE, element: <Snake/>},
    { path: LOGIN, element: <Login/>},
    { path: REGISTER, element: <Register/>},
    { path: SNAKELB, element: <SnakeLB/>},

]);