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
  }
  componentDidMount() {
    this.initializeGraph();
    // window.addEventListener("resize", this.resizeGraph);

    d3.select(this.svg)
      .attr('width', this.container.clientWidth - 80)
      .attr('height', this.container.clientHeight);

    d3.select(this.svg)
      .append('g')
        .attr('transform', `translate(0, ${this.container.clientHeight})`)
        .call(d3.axisBottom(xAxis));
      
    d3.select(this.svg)
      .append('g')
        .call(d3.axisLeft(yAxis));
    
    d3.select(this.svg)
      .append('path')
        .datum(this.props.graphData)
        .attr('class', 'data')
        .attr('stroke', 'green')
        .attr('d', lineGraph);

    for(const key in this.props.graphData) {
      const dataset = this.props.graphData[key];
      if(dataset.length > 0) {
        console.log(dataset);
        
        d3.select(this.svg)
          .datum(dataset)
          .append('path')
            .attr('class', key)
            .attr('stroke', getMonitoringColor(key))
            .attr('d', lineGraph);
      }
    }
  }

  componentDidUpdate() {
    for(const key in this.props.graphData) {
      d3.select(`.${key}`).remove()
    }
    for(const key in this.props.graphData) {
      const dataset = this.props.graphData[key];
      if(dataset.length > 0 && this.props.activeData[key]) {
        console.log(dataset);
        
        d3.select(this.svg)
          .append('path')
            .datum(dataset)
            .attr('class', key)
            .attr('stroke', getMonitoringColor(key))
            .attr('d', lineGraph);
      }
    }
  }

  initializeGraph() {
    xAxis.range([0, this.container.clientWidth - 80])
      .domain(d3.extent(this.props.graphData.temperature, d => d.date));

    yAxis.range([this.container.clientHeight, 0])
      .domain([0, 5]);
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