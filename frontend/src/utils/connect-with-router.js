import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default function connectWithRouter(component, ...args) {
  return withRouter(connect(...args)(component));
}
