import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
// 在现有代码基础上新增以下内容
const CategoryAnalysis = ({ categoryData }) => {
  // 新增状态和ref
  const categoryChartRef = useRef(null);

  // 初始化分类图表
  useEffect(() => {
    let chartInstance = null;
    if (categoryChartRef.current) {
      chartInstance = echarts.init(categoryChartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const data = params[0];
            return `${data.name}<br/>金额：¥${data.value}`;
          },
        },
        xAxis: {
          type: "category",
          data: categoryData.map((item) => item.name),
          axisLabel: {
            rotate: 90, // 标签旋转防止重叠
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "¥{value}",
            rotate: 45, // 标签旋转防止重叠
          },
        },
        series: [
          {
            name: "支出金额",
            type: "bar",
            data: categoryData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
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
  }, [categoryData]);
  return (
    <div
      ref={categoryChartRef}
      style={{
        width: "100%",
        height: "300px",
        marginTop: "10px",
      }}
    ></div>
  );
};

export default CategoryAnalysis;
