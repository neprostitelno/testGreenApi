import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError} from "../../Store/Slices/AuthSlice";
import {useCookies} from "react-cookie";
import style from "./Auth.module.css"
const Logout = () =>{

    const [cookies, setCookies, removeCookies] = useCookies(['auth'])
    const [id, setCookiesId, removeCookiesId] = useCookies(['id'])
    const [token, setCookiesToken, removeCookiesToken] = useCookies(['token'])

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const logout = () => {
        dispatch(setError(null));
        removeCookies('auth', {path: '/'});
        removeCookiesId('id', {path: '/'});
        removeCookiesToken('token', {path: '/'});
        navigate('/')
    }
    return <div>
        <button className={style.buttonOut} onClick={()=>{
        logout()}
        }>Выйти</button>
    </div>
}

export default Logout;