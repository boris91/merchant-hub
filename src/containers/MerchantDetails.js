import React from 'react';
import PropTypes from 'prop-types';
import { DataForm, BidList } from '../components';

const { Mode, FieldType } = DataForm;

const BidPropType = PropTypes.shape({
	id: PropTypes.string,
	carTitle: PropTypes.string,
	amount: PropTypes.number,
	created: PropTypes.string,
});

export default class MerchantDetails extends React.Component {
	static propTypes = {
		getMerchant: PropTypes.func.isRequired,
		unselectMerchant: PropTypes.func.isRequired,
		editMerchant: PropTypes.func.isRequired,
		addMerchant: PropTypes.func.isRequired,
		removeMerchant: PropTypes.func.isRequired,
		addBid: PropTypes.func.isRequired,
		editBid: PropTypes.func.isRequired,
		merchantSelected: PropTypes.shape({
			id: PropTypes.string,
			firstname: PropTypes.string,
			lastname: PropTypes.string,
			avatarUrl: PropTypes.string,
			email: PropTypes.string,
			phone: PropTypes.string,
			hasPremium: PropTypes.bool,
			bids: PropTypes.arrayOf(BidPropType),
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
		bidsPageIndex: 0,
		bid: null,
		bidMode: Mode.Read,
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

	componentDidUpdate() {
		const { mode, merchant } = this.state;
		if (mode !== Mode.Create && (!merchant || Object.keys(merchant).length === 0)) {
			const { history } = this.props;
			history.goBack();
		}
	}

	componentWillUnmount() {
		const { unselectMerchant } = this.props;
		unselectMerchant();
	}

	get fields() {
		return [{
			name: 'avatarUrl',
			label: 'Avatar',
			type: FieldType.Image,
		}, {
			name: 'firstname',
			label: 'First name',
		}, {
			name: 'lastname',
			label: 'Last name',
		}, {
			name: 'email',
			label: 'Email',
		}, {
			name: 'phone',
			label: 'Phone',
		}, {
			name: 'hasPremium',
			label: 'Has premium',
			type: FieldType.Bool,
		}];
	}

	edit = () => this.setState({ mode: Mode.Edit });

	cancel = () => {
		const { merchantSelected: merchant } = this.props;
		const { mode: prevMode } = this.state;
		this.setState({ mode: Mode.Read, merchant }, () => {
			if (prevMode === Mode.Read) {
				const { history } = this.props;
				history.goBack();
			}
		});
	};

	remove = () => {
		const { removeMerchant, merchantSelected: { id }, history } = this.props;
		removeMerchant(id);
		history.goBack();
	};

	save = () => {
		const { merchant, merchant: { id } } = this.state;
		this.setState({ mode: Mode.Read }, () => {
			const { editMerchant } = this.props;
			editMerchant(id, merchant);
		});
	};

	create = () => {
		const { merchant } = this.state;
		const { addMerchant, history } = this.props;
		addMerchant(merchant);
		history.goBack();
	};

	change = (fieldName, value) => {
		this.setState({
			merchant: {
				...this.state.merchant,
				[fieldName]: value,
			},
		});
	};

	onBidsPageRequest = bidsPageIndex => this.setState({ bidsPageIndex });

	onBidSelect = id => {
		const bid = this.state.merchant.bids.find(({ id: bId }) => bId === id);
		this.setState({ bid });
	};

	onBidAdd = () => this.setState({ bid: {}, bidMode: Mode.Create });

	onBidCreate = () => {
		const { bid } = this.state;
		const { addBid } = this.props;
		addBid(bid);
		this.setState({ bid: null, bidMode: Mode.Read });
	};

	onBidUnselect = () => this.setState({ bid: null, bidMode: Mode.Read });

	onBidEdit = () => this.setState({ bidMode: Mode.Edit });

	onBidChange = (fieldName, value) => {
		this.setState({
			bid: {
				...this.state.bid,
				[fieldName]: value,
			},
		});
	};

	onBidSave = () => {
		const { bid: { id }, bid } = this.state;
		const { editBid } = this.props;
		editBid(id, bid);
		this.setState({ bidMode: Mode.Read, bid: null });
	};

	render() {
		const { mode, merchant, bidsPageIndex, bid, bidMode } = this.state;

		return (
			<div className="merchant-details">
				<DataForm
					title="Merchant"
					mode={mode}
					editable
					removable
					fields={this.fields}
					data={merchant}
					actionsOnTop={mode !== Mode.Create}
					onSave={this.save}
					onCreate={this.create}
					onRemove={this.remove}
					onCancel={this.cancel}
					onEdit={this.edit}
					onChange={this.change}
				>
					{mode !== Mode.Create && (
						<BidList
							bids={merchant.bids}
							bidSelected={bid}
							pageIndex={bidsPageIndex}
							onPageRequest={this.onBidsPageRequest}
							modalMode={bidMode}
							onSelect={this.onBidSelect}
							onUnselect={this.onBidUnselect}
							onAdd={this.onBidAdd}
							onCreate={this.onBidCreate}
							onEdit={this.onBidEdit}
							onChange={this.onBidChange}
							onSave={this.onBidSave}
						/>
					)}
				</DataForm>
			</div>
		);
	}
}
