import { NavBar, DatePicker } from "antd-mobile";
import React, { useEffect, useMemo, useState } from "react";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import "./index.scss";
import { useSelector } from "react-redux";
import { groupBy } from "lodash";
import DailyBill from "./components/DailyBill";
import dayjs from "dayjs";
const Month = () => {
  const [showTimeSelector, setshowTimeSelector] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { billList } = useSelector((state) => state.bill);

  const monthGroup = useMemo(() => {
    return groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const { payMoney, incomeMoney, balanceMoney } = useMemo(() => {
    const pay = currentMonthList.filter((item) => item.type === "pay");
    const income = currentMonthList.filter((item) => item.type === "income");
    const payMoney = pay.reduce((pre, item) => pre + item.money, 0);
    const incomeMoney = income.reduce((pre, item) => pre + item.money, 0);
    const balanceMoney = incomeMoney - payMoney;
    return {
      payMoney: payMoney.toFixed(2),
      incomeMoney: incomeMoney.toFixed(2),
      balanceMoney: balanceMoney.toFixed(2),
    };
  }, [currentMonthList]);
  const handleTimeChange = (value) => {
    setCurrentYear(value.getFullYear());
    setCurrentMonth(value.getMonth() + 1);
    const format = dayjs(value).format("YYYY-MM");
    setCurrentMonthList(monthGroup[format] || []);
    setshowTimeSelector(false);
  };
  //初始化把当前月份的账单数据传入
  useEffect(() => {
    const now = dayjs(new Date()).format("YYYY-MM");
    setCurrentMonthList(monthGroup[now] || []);
  }, [monthGroup]);
  const dayGroup = useMemo(() => {
    const g = groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );

    // 按照时间递减排序
    const sortedKeys = Object.keys(g).sort(
      (a, b) => dayjs(b).valueOf() - dayjs(a).valueOf()
    );
    const sortedGroup = {};
    sortedKeys.forEach((key) => {
      sortedGroup[key] = g[key];
    });

    return sortedGroup;
  }, [currentMonthList]);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="date" onClick={() => setshowTimeSelector(true)}>
          <div className="currentYear">{currentYear}</div>
          &nbsp;|&nbsp;
          <div className="currentMonth">
            {currentMonth}
            <span>月账单</span>&nbsp;
            {showTimeSelector ? <UpOutline /> : <DownOutline />}
          </div>
        </div>
        <div className="caculate">
          <div className="expenditures">
            <div className="money">{payMoney}</div>
            <div className="title">支出</div>
          </div>
          <div className="revenue">
            <div className="money">{incomeMoney}</div>
            <div className="title">收入</div>
          </div>
          <div className="balance">
            <div className="money">{balanceMoney}</div>
            <div className="title">结余</div>
          </div>
        </div>
      </div>
      <div>
        {Object.keys(dayGroup).length === 0 ? (
          <div className="noData">暂无数据</div>
        ) : (
          Object.keys(dayGroup).map((item) => {
            return (
              <div key={item}>
                <DailyBill data={dayGroup[item]} />
              </div>
            );
          })
        )}
      </div>

      <DatePicker
        visible={showTimeSelector}
        onClose={() => setshowTimeSelector(false)}
        onConfirm={(value) => handleTimeChange(value)}
        title="记账日期"
        precision="month"
        max={new Date()}
      />
    </div>
  );
};

export default Month;
