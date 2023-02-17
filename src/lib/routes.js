import Root from "components/NotLoggedIn/homepage/home";
import Term from "components/NotLoggedIn/terminal/term";
import { createBrowserRouter} from "react-router-dom";

export const ROOT = "/";
export const TERM = "/terminal";
export const SNAKE = "/snake";
export const LOGIN = "/login"

export const router = createBrowserRouter([
    { path: ROOT, element: <Root/> },
    { path: TERM, element: <Term/>},
    { path: SNAKE, element: "Snake game"},
    { path: LOGIN, element: "Login Page"}

]);