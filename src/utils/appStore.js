import {configureStore} from "@reduxjs/toolkit"
import userReducer from './userSlice' //we can import using any name as it was 
                                    // default export
const appStore=configureStore({
    reducer:{
        "user":userReducer
    },
})

export default appStore;