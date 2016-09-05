import {connect} from 'react-redux';
import ServiceSearchView from './ServiceSearchView';

export default connect(
  state => ({
    suburb: state.getIn(['serviceSearch', 'suburb']),
    loading: state.getIn(['serviceSearch', 'loading']),
  })
)(ServiceSearchView);
