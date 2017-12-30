import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as monitoringActions from '../actions/monitoringActions';

class Monitoring extends Component {

  componentWillMount() {
    this.props.monitoringActions.fetchMockData();
  }

  render() {
    if (this.props.monitoring.length === 0) {
      return null;
    }
    return (
      <div>
        Monitoring API
        <ul>
          {this.props.monitoring.map(monitor =>
            <li
              key={monitor.id}
            >
              {monitor.value}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Monitoring.propTypes = {
  monitoring: PropTypes.array,
  monitoringActions: PropTypes.object
};

const mapStateToProps = (state) => ({
  monitoring: state.monitoring
});

const mapDispatchToProps = (dispatch) => ({
  monitoringActions: bindActionCreators(monitoringActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring);
