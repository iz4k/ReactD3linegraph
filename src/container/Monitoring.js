import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as monitoringActions from '../actions/monitoringActions';
import MonitoringGraph from './MonitoringGraph';
import ToggleButtonContainer from '../presentational/ToggleButtonContainer';
import ToggleButton from '../presentational/ToggleButton';
import SelectedValue from '../presentational/SelectedValue';
import { getMonitoringColor } from '../utils';

class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.updateSelectedValues = this.updateSelectedValues.bind(this);
    this.state = {
      activeData: {
        temperature: true,
        pressure: true,
        vibration: true,
        current: true,
        ultrasound: true
      },
      selectedValues: {
        temperature: null,
        pressure: null,
        vibration: null,
        current: null,
        ultrasound: null
      }
    }
  }

  componentWillMount() {
    this.fetchAllMonitoringData();
  }

  updateData() {
    this.fetchAllMonitoringData();
  }

  fetchAllMonitoringData() {
    this.props.monitoringActions.fetchTemperatureData();
    this.props.monitoringActions.fetchPressureData();
    this.props.monitoringActions.fetchVibrationData();
    this.props.monitoringActions.fetchCurrentData();
    this.props.monitoringActions.fetchUltrasoundData();
  }

  toggleData(key) {
    this.setState({
      activeData: { ...this.state.activeData, [key]: !this.state.activeData[key]}
    });
  }

  updateSelectedValues(values) {
    this.setState({
      selectedValues: values
    });
  }

  renderMonitoringGraph() {
    for(const key in this.props.monitoring) {
      if(this.props.monitoring[key].length === 0 && this.state.activeData[key]) {
        return null;
      }
    }
    return (
      <MonitoringGraph
        activeData={this.state.activeData}
        graphData={this.props.monitoring}
        updateSelectedValues={this.updateSelectedValues}
      />
    )
  }

  renderTest() {
    const buttonArray = [];
    for(const key in this.props.monitoring) {
      buttonArray.push(
        <ToggleButton
          key={key}
          active={this.state.activeData[key]}
          color={getMonitoringColor(key)}
          onClick={() => this.toggleData(key)}
        >
          {key}
          <SelectedValue>
            {this.state.selectedValues[key]}
          </SelectedValue>
        </ToggleButton>
      );
    }
    return buttonArray;
  }
  render() {    
    return (
      <div>
        <ToggleButtonContainer>
          {this.renderTest()}
        </ToggleButtonContainer>
        {this.renderMonitoringGraph()}
      </div>
    );
  }
}

Monitoring.propTypes = {
  monitoring: PropTypes.object,
  monitoringActions: PropTypes.object
};

const mapStateToProps = (state) => ({
  monitoring: state.monitoring
});

const mapDispatchToProps = (dispatch) => ({
  monitoringActions: bindActionCreators(monitoringActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring);
