import {connect} from 'react-redux';
import CounterView from './CounterView';

export default connect(
  state => ({
    suburb: state.getIn(['counter', 'suburb']),
    loading: state.getIn(['counter', 'loading']),
  })
)(CounterView);
