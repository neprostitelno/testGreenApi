import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    messages: [],
    error: null
};

export const signMessages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        },
        setNewMessages(state, action) {
            action.payload['timestamp'] = parseInt(new Date().getTime()/1000)
            state.messages = [...state.messages, action.payload]
        },
        setError(state, action){
            state.error = action.payload;
        },

    }
})

export const {setMessages, setNewMessages, setError} = signMessages.actions;

export default signMessages.reducer;

