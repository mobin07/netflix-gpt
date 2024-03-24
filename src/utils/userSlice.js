import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload    // initial state will store the value of action & payload
        }, 
        removeUser:(state,action)=>{
            return null               // the initial state will become empty
        }
    }
})

export const {addUser,removeUser}=userSlice.actions;

export default userSlice.reducer