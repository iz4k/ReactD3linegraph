import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as monitoringActions from '../actions/monitoringActions';
import MonitoringGraph from './MonitoringGraph';
import ToggleButtonContainer from '../presentational/ToggleButtonContainer';
import ToggleButton from '../presentational/ToggleButton';
import { getMonitoringColor } from '../utils';

class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.state = {
      activeData: {
        temperature: true,
        pressure: true,
        vibration: true,
        current: true,
        ultrasound: true
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
      />
    )
  }

  render() {    
    return (
      <div>
        <ToggleButtonContainer>
          <ToggleButton color={getMonitoringColor('temperature')} onClick={() => this.toggleData('temperature')}>Temperature</ToggleButton>
          <ToggleButton color={getMonitoringColor('pressure')} onClick={() => this.toggleData('pressure')}>Pressure</ToggleButton>
          <ToggleButton color={getMonitoringColor('vibration')} onClick={() => this.toggleData('vibration')}>Vibration</ToggleButton>
          <ToggleButton color={getMonitoringColor('current')} onClick={() => this.toggleData('current')}>Current</ToggleButton>
          <ToggleButton color={getMonitoringColor('ultrasound')} onClick={() => this.toggleData('ultrasound')}>Ultrasound</ToggleButton>
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
