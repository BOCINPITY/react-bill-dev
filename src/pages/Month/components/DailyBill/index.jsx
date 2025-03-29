import React, { useMemo } from "react";
import "./index.scss";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { billNameMap } from "@/utils/resolveBillName";
const DailyBill = ({ data }) => {
  const { payMoney, incomeMoney, balanceMoney } = useMemo(() => {
    const pay = data.filter((item) => item.type === "pay");
    const income = data.filter((item) => item.type === "income");
    const payMoney = pay.reduce((pre, item) => pre + item.money, 0);
    const incomeMoney = income.reduce((pre, item) => pre + item.money, 0);
    const balanceMoney = incomeMoney - payMoney;
    return {
      payMoney: payMoney.toFixed(2),
      incomeMoney: incomeMoney.toFixed(2),
      balanceMoney: balanceMoney.toFixed(2),
    };
  }, [data]);
  const [showList, setShowList] = useState(false);
  return (
    <div className="dailyBill">
      <div className="dailyBillTitle">
        <div className="dailyBillTitleDate">
          {dayjs(data[0].date).format("MM月DD日")}
        </div>
        <div onClick={() => setShowList(!showList)}>
          {showList ? <UpOutline /> : <DownOutline />}
        </div>
      </div>
      <div className={`dailyBillContent`}>
        <div className="dailyBillItem">支出 &nbsp;{payMoney || "0.00"}</div>
        <div className="dailyBillItem">收入 &nbsp;{incomeMoney || "0.00"}</div>
        <div className="dailyBillItem">
          {balanceMoney || "0.00"} &nbsp;<span>结余</span>
        </div>
      </div>
      <div
        className={`balanceList ${
          showList
            ? "animate__animated animate__fadeIn"
            : "animate__animated animate__fadeOut"
        }`}
      >
        {showList &&
          data.map((item) => {
            return (
              <div className="balanceItem" key={item.id}>
                <div className="icon">{billNameMap[item.useFor].icon()}</div>
                <div className="name">{billNameMap[item.useFor].name}</div>
                <div className="time">
                  {dayjs(item.date).format("HH:mm:ss")}
                </div>
                <div className="accountDetail">
                  {item.type === "pay" ? "-" : "+"}

                  {item.money.toFixed(2)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DailyBill;
