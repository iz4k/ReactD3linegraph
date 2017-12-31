import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';
import { xAxis, yAxis, lineGraph, getMonitoringColor } from '../utils';
import GraphContainer from '../presentational/GraphContainer';

class MonitoringGraph extends Component {
  constructor(props) {
    super(props);
    this.initializeGraph = this.initializeGraph.bind(this);
    this.drawAxis = this.drawAxis.bind(this);
    this.drawDataLines = this.drawDataLines.bind(this);
    this.resizeGraph = this.resizeGraph.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeGraph);
    this.resizeGraph();
  }

  componentDidUpdate() {
    this.drawDataLines();
  }

  initializeGraph() {
    xAxis.range([0, this.container.clientWidth - 40])
      .domain(d3.extent(this.props.graphData.temperature, d => d.date));

    yAxis.range([this.container.clientHeight, 0])
      .domain([0, 5]);

    d3.select(this.svg)
      .attr('width', this.container.clientWidth - 40)
      .attr('height', this.container.clientHeight);
  }

  drawAxis() {
    //remove old axis and grid lines
    d3.selectAll('g').remove();

    //draw left and bottom axis lines
    d3.select(this.svg)
      .append('g')
        .attr('transform', `translate(0, ${this.container.clientHeight})`)
        .call(d3.axisBottom(xAxis));
      
    d3.select(this.svg)
      .append('g')
        .call(d3.axisLeft(yAxis));

    //draw background grid
    d3.select(this.svg)
      .append('g')
        .call(d3.axisRight(yAxis)
          .tickSize(this.container.clientWidth - 40)
          .tickFormat(""));
    
    d3.select(this.svg)
      .append('g')
        .attr('transform', `translate(0, ${this.container.clientHeight})`)
        .call(d3.axisTop(xAxis)
          .tickSize(this.container.clientHeight)
          .tickFormat(""));
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
            .attr('stroke', getMonitoringColor(key))
            .attr('d', lineGraph);
      }
    }
  }

  resizeGraph() {
    this.initializeGraph();
    this.drawDataLines();
    this.drawAxis();
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
  graphData: PropTypes.object
}

export default MonitoringGraph;