import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, ModalForm } from '../../components';
import './BidList.css';

const { FieldType } = ModalForm;

const bidTableColumns = [{
	name: 'carTitle',
	label: 'Car',
	width: 150,
}, {
	name: 'amount',
	label: 'Amount',
	width: 100,
}, {
	name: 'created',
	label: 'Created on',
	width: 150,
}];

const bidFormFields = [{
	name: 'carTitle',
	label: 'Car',
}, {
	name: 'amount',
	label: 'Amount',
	type: FieldType.Number,
}, {
	name: 'created',
	label: 'Created on',
	width: FieldType.Date,
}];

export class BidList extends React.Component {
	static propTypes = {
		bids: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			carTitle: PropTypes.string,
			amount: PropTypes.number,
			created: PropTypes.string,
		})),
		pageIndex: PropTypes.number,
		readonly: PropTypes.bool,
		onPageRequest: PropTypes.func,
		onAdd: PropTypes.func,
	};

	static defaultProps = {
		bids: [],
		pageIndex: 0,
		readonly: false,
		onPageRequest() {},
		onAdd() {},
	};

	state = {
		bidSelected: null,
	};

	openBidModal = id => this.setState({
		bidSelected: this.props.bids.find(({ id: bId }) => bId === id),
	});

	closeBidModal = () => this.setState({ bidSelected: null });

	render() {
		const { bids, pageIndex, onPageRequest, readonly, onAdd } = this.props;
		const { bidSelected } = this.state;

		return (
			<div className="bid-list">
				<DataTable
					title="Bids"
					itemName="bid"
					columns={bidTableColumns}
					rows={bids.slice(pageIndex * 5, pageIndex * 5 + 5)}
					pagesCount={Math.ceil(bids.length / 5)}
					countPerPage={5}
					pageIndex={pageIndex}
					onPageRequest={onPageRequest}
					onAddClick={onAdd}
					onRowClick={this.openBidModal}
					readonly={readonly}
				/>
				{!!bidSelected && (
					<ModalForm title="Bid" fields={bidFormFields} data={bidSelected} onCancel={this.closeBidModal} />
				)}
			</div>
		);
	}
}

export default BidList;
