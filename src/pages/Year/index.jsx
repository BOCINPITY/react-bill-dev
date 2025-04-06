import React, { useMemo, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import { DatePicker } from "antd-mobile";
import * as echarts from "echarts";
import "./index.scss";
import CategoryAnalysis from "./components/CategoryAnalysis";
import { billNameMap } from "@/utils/resolveBillName";
const Year = () => {
  const { billList } = useSelector((state) => state.bill);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showTimeSelector, setshowTimeSelector] = useState(false);
  const chartRef = useRef(null);

  // 按照年份分组账单数据
  const yearGroup = useMemo(() => {
    return billList.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  }, [billList]);
  console.log(yearGroup);
  // 获取当前年份的账单数据（修改为保持数值类型）
  const { incomeMoney, payMoney, balanceMoney } = useMemo(() => {
    const currentYearList = yearGroup[currentYear] || [];
    const income = currentYearList.filter((item) => item.type === "income");
    const pay = currentYearList.filter((item) => item.type === "pay");

    const incomeMoney = income.reduce((pre, item) => pre + item.money, 0);
    const payMoney = pay.reduce((pre, item) => pre + item.money, 0);
    const balanceMoney = incomeMoney - payMoney;

    return {
      incomeMoney,
      payMoney,
      balanceMoney,
    };
  }, [currentYear, yearGroup]);

  // ECharts 初始化与更新
  useEffect(() => {
    let chartInstance = null;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: ¥{c} ({d}%)",
        },
        series: [
          {
            name: "年度收支",
            type: "pie",
            radius: "90%",
            color: ["#91cc75", "#ee6666"],
            data: [
              { value: incomeMoney, name: "收入" },
              { value: payMoney, name: "支出" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chartInstance.setOption(option);
    }

    return () => {
      if (chartInstance) chartInstance.dispose();
    };
  }, [incomeMoney, payMoney]);

  const handleTimeChange = (value) => {
    setCurrentYear(value.getFullYear());
    setshowTimeSelector(false);
  };
  //分类数据
  // 处理分类消费数据
  const categoryData = useMemo(() => {
    const currentYearData = yearGroup[currentYear] || [];
    const categoryMap = currentYearData
      .filter((item) => item.type === "pay") // 只处理支出
      .reduce((acc, item) => {
        const category = item.useFor;
        acc[category] = (acc[category] || 0) + item.money;
        return acc;
      }, {});
    return Object.entries(categoryMap)
      .map(([name, value]) => {
        name = billNameMap[name]?.name || name; // 获取分类名称
        return {
          name,
          value: Number(value.toFixed(2)),
        };
      })
      .sort((a, b) => b.value - a.value); // 降序排列
  }, [currentYear, yearGroup]);
  return (
    <div className="year-container">
      <div className="year-header">
        <div
          onClick={() => setshowTimeSelector(!showTimeSelector)}
          className="year-selector"
        >
          <span>年份</span>
          {currentYear} {showTimeSelector ? <UpOutline /> : <DownOutline />}
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>年度财务总览</h3>
      <div className="overview">
        <div className="panel">
          <div
            className="overviewPanel"
            ref={chartRef}
            style={{ height: "120px" }}
          ></div>
          <div className="decreption">
            <span>在{currentYear}年里，您总共收入了</span>
            <span style={{ color: "green" }}>{incomeMoney} 元</span>
            <span>，支出</span>
            <span style={{ color: "red" }}>{payMoney} 元</span>
          </div>
        </div>

        <div className="year-balance">
          <span>年度结余&nbsp;</span>
          <span style={{ color: balanceMoney > 0 ? "green" : "red" }}>
            {balanceMoney} 元
          </span>
        </div>
      </div>
      <h3>分类消费分析</h3>
      <div className="categoryView">
        {categoryData.length === 0 ? (
          "暂无数据"
        ) : (
          <CategoryAnalysis categoryData={categoryData} />
        )}
      </div>

      <DatePicker
        visible={showTimeSelector}
        onClose={() => setshowTimeSelector(false)}
        onConfirm={(value) => handleTimeChange(value)}
        title="选择年份"
        precision="year"
        max={new Date()}
      />
    </div>
  );
};

export default Year;
