import {NavLink, Outlet} from "react-router-dom";
import './RootLayout.css'

export const RootLayout = () => {
    return (
        <>
            <header>
                <nav className="nav-box">
                    <h1>Employee Management App</h1>
                    <ul className="nav-list">
                        <li><NavLink to={"/"} className={"nav-link"}>Home</NavLink></li>
                        <li><NavLink to={"/login"} className={"nav-link"}>Login</NavLink></li>
                        <li><NavLink to={"/logout"} className={"nav-link"}>Logout</NavLink></li>
                        <li><NavLink to={"/signup"} className={"nav-link"}>Signup</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </>
    )
}