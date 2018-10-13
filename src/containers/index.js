import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from '../actions';
import MerchantList from './MerchantList';
import MerchantDetails from './MerchantDetails';

const containers = [
	MerchantList,
	MerchantDetails,
];

const actionFuncs = Object.entries(actions).reduce((funcs, [key, value]) => {
	if (typeof value === 'function') {
		funcs[key] = value;
	}
	return funcs;
}, {});

const mapDispatchToProps = dispatch => (Object.entries(actionFuncs).reduce((dispatchMap, [key, action]) => {
	return Object.assign(dispatchMap, {
		[key]: (...args) => dispatch(action(...args)),
	});
}, {}));

const mapStateToProps = state => state;

export default containers.reduce((containers, container) => {
	return Object.assign(containers, {
		[container.name]: withRouter(connect(mapStateToProps, mapDispatchToProps)(container)),
	});
}, {});
