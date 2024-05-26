import { createSlice } from "@reduxjs/toolkit"; 

const initalstate={
    currentUser : null , 
    error:null , 
    loading:false 

} 

const userSlice = createSlice({
    namee:'user' ,
    initialState:initalstate , 
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