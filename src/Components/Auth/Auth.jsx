import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {setError} from "../../Store/Slices/AuthSlice";
import style from "./Auth.module.css"


const Auth = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    let navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['auth'])
    const [id, setCookiesId] = useCookies(['id'])
    const [token, setCookiesToken] = useCookies(['token'])

    const dispatch = useDispatch();
    const {error} = useSelector(state => state.auth)

    const onSubmit = (data) => {
        const postUser = async () => {

            try {
                const res = await axios.get(`https://api.green-api.com/waInstance${data.id}/getStateInstance/${data.token}`)
                if (res.status === 200) {
                    if (res.data.stateInstance === "notAuthorized") {
                        dispatch(setError(res.data.stateInstance))
                    } else {
                        setCookies('auth', res.data.stateInstance, {path: '/', maxAge: 60 * 60 * 24})
                        setCookiesId('id', data.id, {path: '/', maxAge: 60 * 60 * 24})
                        setCookiesToken('token', data.token, {path: '/', maxAge: 60 * 60 * 24})

                        navigate('/users')
                    }
                }
            } catch (e) {
                if (e.response.request.status === 400) {

                }
                console.log(e.response.request.status)

            }
        }
        postUser();

    };

    return <div className={style.auth}>
        <div className={style.title}>
            Добро пожаловать в WhatsApp!
        </div>
        {error? <div className={style.error}>Пользователь не авторизован!</div>:null}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.form}>
                <div>
                    Введите id
                    <input className={style.input} {...register("id", {required: true})}
                           aria-invalid={errors.id ? "true" : "false"}/>
                    {errors.id?.type === 'required' && <p role="alert">Введите id</p>}
                </div>
                <div>
                    Введите token
                    <input className={style.input} {...register("token", {required: true})}
                           aria-invalid={errors.token ? "true" : "false"}/>
                    {errors.token?.type === 'required' && <p role="alert">Введите token</p>}
                </div>
                <div>
                    <input className={style.button} type="submit" value="Войти"/>
                </div>
            </div>
        </form>
    </div>
}
export default Auth;