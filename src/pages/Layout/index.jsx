import { getBillList } from "@/store/modules/billSlice";
import { TabBar } from "antd-mobile";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ReceivePaymentOutline,
  AddSquareOutline,
  PieOutline,
} from "antd-mobile-icons";
import "./index.scss";
const Layout = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      key: "/month",
      title: "月度账单",
      icon: <ReceivePaymentOutline />,
    },
    {
      key: "/new",
      title: "记账",
      icon: <AddSquareOutline />,
    },
    {
      key: "/year",
      title: "年度账单",
      icon: <PieOutline />,
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="container">
        <Outlet></Outlet>
      </div>
      <div className="footer">
        <TabBar onChange={(key) => navigate(key)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
