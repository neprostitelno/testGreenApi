import React, {useCallback, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {setMessages, setNewMessages} from "../../Store/Slices/DialogsSlice";
import {useForm} from "react-hook-form";
import style from "./Dialogs.module.css";
import {setError} from "../../Store/Slices/DialogsSlice";

const Dialogs = (props) => {
    const [id, setCookiesId] = useCookies(['id'])
    const [token, setCookiesToken] = useCookies(['token'])
    const dispatch = useDispatch();
    const {messages, error} = useSelector(state => state.messages)
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [newDialog, setNewDialog] = useState(false)
    let friend = null
    const [open, setOpen] = useState(false)


    const onSubmit = (data, event) => {
        friend = props.friend
        const sendMessage = async () => {
            const newMessage = {type: "outgoing", textMessage: data.message, chatId: props.friend}
            try {
                const res = await axios.post(`https://api.green-api.com/waInstance${id.id}/sendMessage/${token.token}`, {
                    chatId: friend,
                    message: data.message,

                })
                if (res.status === 200) {
                    dispatch(setNewMessages(newMessage))
                }
            } catch (e) {
            }
        }
        sendMessage();
        event.target.reset();
    }

    const SendRequest = (phone) => {
        const setDialog = async () => {
            try {
                const res = await axios.post(`https://api.green-api.com/waInstance${id.id}/getChatHistory/${token.token}`, {
                    chatId: phone,
                    count: 10
                })
                dispatch(setMessages(res.data))
                if(res.status === 200){
                    dispatch(setError(200))
                }
                setOpen(true)
            } catch (e) {

            }
        }
        setDialog()
    }


    React.useEffect(() => {
        friend = props.friend
        const getMessages = async () => {
            try {
                if(!friend){
                    return
                }
                const res = await axios.post(`https://api.green-api.com/waInstance${id.id}/getChatHistory/${token.token}`, {
                    chatId: friend,
                    count: 10
                })
                dispatch(setMessages(res.data.reverse()))

            } catch (e) {
            }
        }
        getMessages()
    }, [props.friend])


    return <div className={style.dialogs}>
        <div>
            <div className={style.title}>
                <div>Сообщения</div>
                <div className={style.name}>{props.name}</div>
            </div>
            {props.open || open? <div>
                <div className={style.messages}>
                    {messages.map((message, index) => <div key={index}>
                        <div className={message.type === "incoming" ? style.incoming : style.outgoing}>
                            {message.type === "incoming" ? <div>
                                <div>{message.textMessage}
                                </div>
                                <div>
                                    {(new Date(message.timestamp)).getHours()}:{(new Date(message.timestamp)).getMinutes()}
                                </div>
                            </div> : <div>
                                <div>{message.textMessage}</div>
                                <div>
                                    {(new Date(message.timestamp)).getHours()}:{(new Date(message.timestamp)).getMinutes()}
                                </div>
                            </div>}
                        </div>
                    </div>)}
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className={style.input} {...register("message", {required: true})}/>
                            <input className={style.submit} type={"submit"}/>
                        </form>
                    </div>
                </div>
            </div> : <div>Откройте чат.</div>}
            <div>
                <button className={style.newDialog} onClick={() => {
                    setNewDialog(!newDialog)
                }}>+
                </button>
            </div>
            <div>
                {newDialog ? <div>
                    <div className={style.text}>
                        Введите номер телефона без пробелов и других знаков начиная с кода страны.
                    </div>
                    <div>
                        <form>
                            <input id="phone" className={style.input} placeholder={"79999999999"}/>
                            <input className={style.submit} type={"button"} value="Написать" onClick={() => {
                                SendRequest(document.getElementById('phone').value + '@c.us')
                            }}/>
                        </form>
                    </div>
                </div> : null}
            </div>
        </div>
    </div>
}

export default Dialogs;