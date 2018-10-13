import React from 'react';
import PropTypes from 'prop-types';
import { DataForm, DataTable } from '../components';

const { Mode } = DataForm;

export default class MerchantDetails extends React.Component {
	static propTypes = {
		getMerchant: PropTypes.func.isRequired,
		unselectMerchant: PropTypes.func.isRequired,
		editMerchant: PropTypes.func.isRequired,
		addMerchant: PropTypes.func.isRequired,
		removeMerchant: PropTypes.func.isRequired,
		merchantSelected: PropTypes.shape({
			id: PropTypes.string,
			firstname: PropTypes.string,
			lastname: PropTypes.string,
			avatarUrl: PropTypes.string,
			email: PropTypes.string,
			phone: PropTypes.string,
			hasPremium: PropTypes.bool,
			bids: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.string,
				carTitle: PropTypes.string,
				amount: PropTypes.number,
				created: PropTypes.string,
			})),
		}),
		history: PropTypes.shape({
			goBack: PropTypes.func,
		}).isRequired,
	};

	static defaultProps = {
		merchantSelected: null,
	};

	static getDerivedStateFromProps(props, state) {
		const { mode } = state;
		return mode === Mode.Create || mode === Mode.Edit ? null : {
			...state,
			merchant: Object.assign({}, props.merchantSelected),
		};
	}

	state = {
		mode: Mode.Read,
		merchant: Object.assign({}, this.props.merchantSelected),
	};

	componentDidMount() {
		const { match: { path, params: { id } }, getMerchant } = this.props;

		if (path === '/merchant/create') {
			this.setState({
				mode: Mode.Create,
				merchant: {},
			});
		} else {
			getMerchant(id);
		}
	}

	componentWillUnmount() {
		const { unselectMerchant } = this.props;
		unselectMerchant();
	}

	get fields() {
		return [{
			name: 'firstname',
			label: 'First name',
		}, {
			name: 'lastname',
			label: 'Last name',
		}, {
			name: 'avatarUrl',
			label: 'Avatar',
		}, {
			name: 'email',
			label: 'Email',
		}, {
			name: 'phone',
			label: 'Phone',
		}, {
			name: 'hasPremium',
			label: 'Has premium',
			type: 'checkbox',
		}];
	}

	edit = () => this.setState({ mode: Mode.Edit });

	cancel = () => {
		const { merchantSelected: merchant } = this.props;
		const { mode: prevMode } = this.state;
		this.setState({ mode: Mode.Read, merchant }, () => {
			if (prevMode === Mode.Create) {
				const { history } = this.props;
				history.goBack();
			}
		});
	};

	remove = () => {
		console.log('remove');
		const { merchantSelected: merchant } = this.props;
		this.setState({ mode: Mode.Read, merchant }, () => {
			const { removeMerchant, merchantSelected: { id }, history } = this.props;
			removeMerchant(id);
			history.goBack();
		});
	};

	save = () => {
		const { merchant, merchant: { id } } = this.state;
		this.setState({ mode: Mode.Read, merchant }, () => {
			const { editMerchant, history } = this.props;
			editMerchant(id, merchant);
			history.goBack();
		})
	};

	create = () => {
		const { merchant } = this.state;
		this.setState({ mode: Mode.Read, merchant }, () => {
			const { addMerchant, history } = this.props;
			addMerchant(merchant);
			history.goBack();
		})
	};

	change = (fieldName, value) => {
		this.setState({
			merchant: {
				...this.state.merchant,
				[fieldName]: value,
			},
		});
	};

	render() {
		const { mode, merchant } = this.state;

		return (
			<div className="merchant-details">
				<DataForm
					title="Merchant"
					mode={mode}
					editable
					removable
					fields={this.fields}
					data={merchant}
					onSave={this.save}
					onCreate={this.create}
					onRemove={this.remove}
					onCancel={this.cancel}
					onEdit={this.edit}
					onChange={this.change}
				/>
			</div>
		);
	}
}
