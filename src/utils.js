import * as d3 from 'd3';

export const generateMockData = (range) => {
  const today = new Date();
  today.setHours(0, 0,0,0);
  return Array.from(new Array(range), (x, i) => {
    return {
      date: today.setDate(today.getDate() - 1),
      value: Math.random() * 5
    }
  });
}

export const getMonitoringColor = (key) => {
  switch (key) {
    case 'temperature':
      return '#04e002';
    case 'pressure':
      return '#eeff0b';
    case 'vibration':
      return '#00c2ff';
    case 'current':
      return '#ff8f00';
    case 'ultrasound':
      return '#d1d1d1';
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