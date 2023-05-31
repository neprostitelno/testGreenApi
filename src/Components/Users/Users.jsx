import React, {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {deleteNotification, setNotification, setUsers} from "../../Store/Slices/UsersSlice";
import Dialogs from "../Dialogs/Dialogs";
import style from "./Users.module.css";
import avatar from './../../assets/avatar.svg'

const Users = () => {
    const {users, notification} = useSelector(state => state.users)
    const [id, setCookiesId] = useCookies(['id'])
    const [token, setCookiesToken] = useCookies(['token'])
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const [friend, setFriend] = useState()
    const [friendName, setFriendName] = useState()
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`https://api.green-api.com/waInstance${id.id}/getContacts/${token.token}`)
                dispatch(setUsers(res.data))
            } catch (e) {

            }
        }
        getUsers()
    }, [])

    React.useEffect(() => {
        const getNotification = async () => {
            try {
                    const res = await axios.get(`https://api.green-api.com/waInstance${id.id}/receiveNotification/${token.token}`)
                    if (res.data.body.typeWebhook === 'incomingMessageReceived') {
                        dispatch(setNotification(res.data))
                    }
                    if (res.status === 200) {
                        const resDelete = await axios.delete(`https://api.green-api.com/waInstance${id.id}/deleteNotification/${token.token}/${res.data.receiptId}`)
                    }
            } catch (e) {

            }
            /*setTimeout(async () => {
                await getNotification();
            }, 10000)*/
        }
        getNotification()
    })

    return <div className={style.form}>
        <div className={style.users}>
            <div className={style.title}>
                Чаты
            </div>
            {users.map((user, index) => <div key={index}>
                <div className={style.name}>
                    <button className={style.user} onClick={() => {
                        setIsOpen(true);
                        setFriend(user.id)
                        setFriendName(user.name)
                        dispatch(deleteNotification(user.id))
                    }}><div><img alt='' src={avatar} className={style.avatar}/></div><div className={style.userName}>{user.name}</div></button>
                        <div>
                            {notification.map((n, index) =>
                                <div key ={index}>{n && n.body.senderData.chatId === user.id ?
                                    <div className={style.notification}>Новое сообщение</div> : null}</div>)}
                        </div>
                </div>
            </div>)}
        </div>
        <div className={style.dialogs}>
            <Dialogs open={isOpen} friend={friend} name = {friendName}/>
        </div>
    </div>
}

export default Users;