import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { xAxis, yAxis, lineGraph, getMonitoringColor } from '../utils';
import GraphContainer from '../presentational/GraphContainer';
import { local } from 'd3';

class MonitoringGraph extends Component {
  constructor(props) {
    super(props);
    this.initializeGraph = this.initializeGraph.bind(this);
    this.drawAxis = this.drawAxis.bind(this);
    this.drawDataLines = this.drawDataLines.bind(this);
    this.resizeGraph = this.resizeGraph.bind(this);
    this.drawSelectorLine = this.drawSelectorLine.bind(this);
    this.drawSelectedLine = this.drawSelectedLine.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeGraph);
    this.resizeGraph();
  }

  componentDidUpdate() {
    this.drawDataLines();
  }

  initializeGraph() {
    //axis range and domain functions
    xAxis.range([0, this.container.clientWidth - 40])
      .domain(d3.extent(this.props.graphData.temperature, d => d.date));

    yAxis.range([this.container.clientHeight, 0])
      .domain([0, 5]);

    //svg container
    d3.select(this.svg)
      .attr('width', this.container.clientWidth - 40)
      .attr('height', this.container.clientHeight);

    //mouse event overlay
    d3.select(this.svg)
      .append('rect')
        .attr('class', 'overlay')
        .attr('width', this.container.clientWidth - 40)
        .attr('height', this.container.clientHeight)
        .attr('fill', '#f9f9f9')
        .attr('pointer-events', 'all')
        .on('mousemove', this.drawSelectorLine)
        .on('click', this.drawSelectedLine);
  }

  drawAxis() {
    //remove old axis and grid lines
    d3.selectAll('g').remove();

    //draw background grid
    d3.select(this.svg)
      .append('g')
        .call(d3.axisRight(yAxis)
          .tickSize(this.container.clientWidth - 40)
          .tickFormat(''));
    
    d3.select(this.svg)
      .append('g')
        .attr('transform', `translate(0, ${this.container.clientHeight})`)
        .call(d3.axisTop(xAxis)
          .tickSize(this.container.clientHeight)
          .tickFormat(''));

    //draw left and bottom axis lines
    d3.select(this.svg)
      .append('g')
        .attr('transform', `translate(0, ${this.container.clientHeight})`)
        .call(d3.axisBottom(xAxis));
      
    d3.select(this.svg)
      .append('g')
        .call(d3.axisLeft(yAxis));
  }

  drawDataLines() {
    //remove previous graph lines
    for(const key in this.props.graphData) {
      d3.select(`.${key}`).remove()
    }
    
    //draw data graph if it has data and it is active
    for(const key in this.props.graphData) {
      const dataset = this.props.graphData[key];
      if(dataset.length > 0 && this.props.activeData[key]) {        
        d3.select(this.svg)
          .append('path')
            .datum(dataset)
            .attr('class', `${key} dataline`)
            .attr('pointer-events', 'none')
            .attr('stroke', getMonitoringColor(key))
            .attr('d', lineGraph);
      }
    }
  }

  resizeGraph() {
    this.initializeGraph();
    this.drawAxis();
    this.drawDataLines();
    d3.select('.selectedline').remove();
    d3.select('.selectorline').remove();
    d3.selectAll('.selectionCircle').remove();

  }

  drawSelectorLine() {
    //remove old selector line
    d3.select('.selectorline').remove();

    const xPos = d3.event.offsetX;
    
    d3.select(this.svg)
      .append('line')
        .attr('class', 'selectorline')
        .attr('pointer-events', 'none')
        .attr('x1', xPos)
        .attr('y1', 0)
        .attr('x2', xPos)
        .attr('y2', this.container.clientHeight);
  }

  drawSelectedLine() {
    //remove old selected line
    d3.select('.selectedline').remove();

    let xPos = d3.event.offsetX; //click position
    let x0 = xAxis.invert(xPos); //change position to date
    if(x0.getHours() >= 12) {  //select date closest to clicked point
      x0.setDate(x0.getDate() + 1)
    }
    x0.setHours(0, 0, 0, 0);  //round date down
    xPos = xAxis(x0); //change back to coordinate position

    //draw selected line
    d3.select(this.svg)
      .append('line')
        .attr('class', 'selectedline')
        .attr('x1', xPos)
        .attr('y1', 0)
        .attr('x2', xPos)
        .attr('y2', this.container.clientHeight);
    
    //find index of drawn line
    let idx = 0;
    for(let i = 0; i < this.props.graphData.temperature.length; i++) {
      if (new Date(this.props.graphData.temperature[i].date).getDate() === x0.getDate()) {
        idx = i;
        break;
      }
    }
    
    //remove old circles
    d3.selectAll('.selectionCircle').remove();

    //draw circles on selection path
    for(const key in this.props.graphData) {
      const yPos = yAxis(this.props.graphData[key][idx].value);
      d3.select(this.svg)
        .append('circle')
          .attr('class', 'selectionCircle')
          .attr('fill', getMonitoringColor(key))
          .attr('cx', xPos)
          .attr('cy', yPos)
          .attr('r', 6);

    }

    //find and display selected values
    const selectedValues = {};
    for(const key in this.props.graphData) {
      selectedValues[key] = this.props.graphData[key][idx].value.toFixed(2);
    }
    this.props.updateSelectedValues(selectedValues);
  }

  render() {
    return (
      <GraphContainer innerRef={node => this.container = node}>
        <svg ref={node => this.svg = node}>
        </svg>
      </GraphContainer>
    )
  }
}

MonitoringGraph.propTypes = {
  activeData: PropTypes.object,
  graphData: PropTypes.object,
  updateSelectedValues: PropTypes.func
}

export default MonitoringGraph;