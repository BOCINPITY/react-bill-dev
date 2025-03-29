import billReducer from '@/store/modules/billSlice'
import { configureStore } from '@reduxjs/toolkit'
export default configureStore({
    reducer: {
        bill: billReducer,
    },

})
