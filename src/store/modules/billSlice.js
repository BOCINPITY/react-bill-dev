import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:3001'
const billSlice = createSlice({
    name: "bill",
    initialState: {
        billList: [],
    },
    reducers: {
        //同步修改方法
        setBillList: (state, action) => {
            state.billList = action.payload;
        },
        //同步新增方法
        addBill: (state, action) => {
            state.billList.push(action.payload);
        },
    }
})
//actionCreator
const { setBillList, addBill } = billSlice.actions;
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get(`${BASE_URL}/bill`)
        dispatch(setBillList(res.data))
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post(`${BASE_URL}/bill`, data)
        dispatch(addBill(res.data))
    }
}
//导出
export { getBillList, addBillList }
export default billSlice.reducer;