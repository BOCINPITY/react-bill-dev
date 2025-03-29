import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    }
})
//actionCreator
const { setBillList } = billSlice.actions;

const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://127.0.0.1:3001/bill")
        dispatch(setBillList(res.data))
    }
}
//导出
export { getBillList }
export default billSlice.reducer;