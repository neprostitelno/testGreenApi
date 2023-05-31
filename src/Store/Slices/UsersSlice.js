import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    users: [],
    notification: []
};

export const signUsers = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        setNotification(state, action) {
            state.notification = [...state.notification, action.payload];
        },
        deleteNotification(state, action) {
            for(let i = 0; i < state.notification.length; i++) {
                if (state.notification[i] && action.payload === state.notification[i].body.senderData.chatId) {
                    state.notification.splice(i,1)
                }
            }
        }
    }
})

export const {setUsers, setNotification, deleteNotification} = signUsers.actions;

export default signUsers.reducer;

