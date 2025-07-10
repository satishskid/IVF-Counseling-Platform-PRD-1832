import React from 'react';
import ReactECharts from 'echarts-for-react';

const PatientProgressChart = ({ progressData, height }) => {
  // Sort data by date
  const sortedData = [...progressData].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const dates = sortedData.map(entry => entry.date);
  const scores = sortedData.map(entry => entry.wellnessScore);
  
  const option = {
    grid: {
      top: 10,
      right: 30,
      bottom: 30,
      left: 40
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        return `Date: ${dates[dataIndex]}<br/>Wellness Score: ${scores[dataIndex]}`;
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 1,
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      }
    },
    series: [
      {
        data: scores,
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#3b82f6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)'
              }
            ]
          }
        }
      }
    ]
  };
  
  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px` }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default PatientProgressChart;