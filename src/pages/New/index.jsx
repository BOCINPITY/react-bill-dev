import {
  NavBar,
  DatePicker,
  Input,
  Radio,
  Space,
  Toast,
  Modal,
  Form,
} from "antd-mobile";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { billNameMap } from "@/utils/resolveBillName.js";
import { BillOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import axios from "axios";

const New = () => {
  const datePickerRef = useRef(null);
  const keys = Object.keys(billNameMap);
  const naigate = useNavigate();
  const [billInfo, setBillInfo] = useState({
    money: 0,
    date: "",
    type: "",
    useFor: "",
  });
  const [form] = Form.useForm();
  const handleSubmit = async (useFor) => {
    try {
      const values = await form.validateFields();
      const { type, date } = values;
      const updatedBillInfo = {
        ...billInfo,
        useFor,
        type,
        date: dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
      };

      // 发起请求
      const response = await axios.post(
        "http://127.0.0.1:3001/bill",
        updatedBillInfo
      );
      if (response.status === 201) {
        Toast.show({ content: "提交成功" });
        naigate("/");
      } else {
        Toast.show({ content: "提交失败，请稍后再试" });
      }
    } catch (error) {
      console.error("提交失败:", error);
      Toast.show({ content: "提交失败，请检查表单" });
    }
  };

  return (
    <div className="container">
      <div className="newHeader">
        <NavBar className="nav" onBack={() => naigate("/")}>
          记一笔
        </NavBar>
        <div className="account">
          <div className="icon">
            <BillOutline />
          </div>
          <div className="accountValue">
            <Input
              onChange={(value) => {
                setBillInfo({ ...billInfo, money: Number(value) });
              }}
              type="number"
              placeholder={billInfo.money.toFixed(2)}
              clearable
            />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="category">
          {keys.map((item) => {
            return (
              <div
                className="categoryItem"
                key={item}
                onClick={() => {
                  if (billInfo.money === 0) {
                    Toast.show({
                      content: "请输入金额",
                    });
                    return;
                  } else {
                    Modal.confirm({
                      title: "选择记账类型与记账日期",
                      content: (
                        <>
                          <Form name="form" form={form} layout="horizontal">
                            <Form.Item
                              name="type"
                              label="记账类型"
                              rules={[
                                { required: true, message: "请选择记账类型" },
                              ]}
                            >
                              <Radio.Group>
                                <Space direction="vertical">
                                  <Radio value="pay">支出</Radio>
                                  <Radio value="income">收入</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item
                              name="date"
                              label="记账日期"
                              trigger="onConfirm"
                              rules={[
                                { required: true, message: "请选择记账日期" },
                              ]}
                              onClick={() => {
                                datePickerRef.current.open();
                              }}
                              required
                            >
                              <DatePicker ref={datePickerRef} max={new Date()}>
                                {(value) =>
                                  value
                                    ? dayjs(value).format("YYYY-MM-DD")
                                    : "选择日期"
                                }
                              </DatePicker>
                            </Form.Item>
                          </Form>
                        </>
                      ),
                      closeOnMaskClick: true,
                      onConfirm: () => {
                        handleSubmit(item); // 将当前的 useFor 传递给 handleSubmit
                      },
                      onClose: () => console.log("onClose"),
                    });
                  }
                }}
              >
                <div className="icon">{billNameMap[item].icon(24)}</div>
                <div className="name">{billNameMap[item].name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default New;
