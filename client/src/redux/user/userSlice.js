import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
    currentUser : null , 
    error:null , 
    loading:false 

} 

const userSlice = createSlice({
    name:'user' ,
    initialState:initialState , 
    reducers:{ 
        signInStart:(state)=>{
            state.loading = true  ;
        } , 
 
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload     ;
            state.loading = false  ; 
            state.error = null 
        } ,
        signInFaluire :(state, action)=>{
            state.error = action.payload  ;
            state.loading = false  ;
        
        }
    }
}) 

export const {signInStart, signInSuccess, signInFaluire} = userSlice.actions ;
export default userSlice.reducer ;