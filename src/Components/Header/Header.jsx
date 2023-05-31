import React from "react";
import style from "./Header.module.css"
import {useCookies} from "react-cookie";
import Logout from "../Auth/Logout";

const Header = () => {
    const [cookies, setCookies] = useCookies(['auth'])
    return <div className={style.header}>
        WhatsApp
        {cookies.auth?
            <div>
                <Logout/>
            </div> : null}
    </div>
}
export default Header;