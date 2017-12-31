import * as d3 from 'd3';

export const generateMockData = (range) => {
  const today = new Date();
  today.setHours(0, 0,0,0);
  let value = Math.random() * 5;
  return Array.from(new Array(range), (x, i) => {
    // direction of value change
    const valueChangeDirection = Math.random() > 0.5 ? -1 : 1;
    const valueChange = Math.random() * valueChangeDirection;
    //guard to keep value within boundaries 0 and 5
    if ((value + valueChange) < 0 || (value + valueChange) > 5) {
      value = value - valueChange;
    } else {
      value = value + valueChange;
    }
    let dataPoint = {
      date: today.setDate(today.getDate() - 1),
      value
    }
    return dataPoint;
  });
}

export const getMonitoringColor = (key) => {
  switch (key) {
    case 'temperature':
      return '#04e002';
    case 'pressure':
      return '#0409e0';
    case 'vibration':
      return '#00c2ff';
    case 'current':
      return '#ff8f00';
    case 'ultrasound':
      return '#ff17d6';
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