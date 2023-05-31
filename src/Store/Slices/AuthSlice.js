import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    error: null

};

export const signAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        }
    }
})

export const {setError} = signAuth.actions;

export default signAuth.reducer;

