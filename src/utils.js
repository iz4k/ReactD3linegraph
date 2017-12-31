import * as d3 from 'd3';

export const generateMockData = (range) => {
  const today = new Date();
  return Array.from(new Array(range), (x, i) => {
    return {
      date: new Date().setDate(today.getDate() - i),
      value: Math.random() * 5
    }
  });
}

export const getMonitoringColor = (key) => {
  switch (key) {
    case 'temperature':
      return 'red';
    case 'pressure':
      return 'green';
    case 'vibration':
      return 'yellow';
    case 'current':
      return 'blue';
    case 'ultrasound':
      return 'papayawhip';
    default:
      return '#333';
  }
}

export const range = 7;

export const xAxis = d3.scaleTime();

export const yAxis = d3.scaleLinear();

export const lineGraph = d3.line()
  .x((d) => xAxis(d.date))
  .y((d) => yAxis(d.value))
  .curve(d3.curveMonotoneX);