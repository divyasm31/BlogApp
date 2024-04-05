import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const userAuthorLoginThunk=createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
    try{
        if(userCredObj.userType==='user'){
            const res= await axios.post('http://localhost:4000/user-api/login',userCredObj)
            if(res.data.message==='Login Successful'){
                localStorage.setItem('token',res.data.token);
            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data;
        }
        if(userCredObj.userType==='author'){
            const res= await axios.post('http://localhost:4000/author-api/login',userCredObj)
            if(res.data.message==='Login successful'){
                localStorage.setItem('token',res.data.token); 

            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data;
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})
export const userAuthorSlice=createSlice({
    name:"user-author-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccurred:false,
        errMessage:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errorOccurred=false;
            state.errMessage=''

        }
    },
    extraReducers: builder=>builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.loginUserStatus=true;
        state.errMessage='';
        state.errorOccurred=false;
    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.loginUserStatus=false;
        state.errMessage=action.payload;
        state.errorOccurred=true;
    }),
})
const {}=userAuthorSlice.actions;
export default userAuthorSlice.reducer;