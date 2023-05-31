import {configureStore} from '@reduxjs/toolkit'
import signAuth from "./Slices/AuthSlice";
import signUsers from "./Slices/UsersSlice";
import signMessages from "./Slices/DialogsSlice";

const store = configureStore({
    reducer: {
        auth: signAuth,
        users: signUsers,
        messages: signMessages
    }
})
export default store;
