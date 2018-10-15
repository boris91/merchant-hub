import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, ModalDialog } from '../components';

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

export class BidList extends React.Component {
	static propTypes = {
		bids: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			carTitle: PropTypes.string,
			amount: PropTypes.number,
			created: PropTypes.string,
		})),
		pageIndex: PropTypes.number,
		onPageRequest: PropTypes.func,
	};

	static defaultProps = {
		bids: [],
		pageIndex: 0,
		onPageRequest() {},
	};

	state = {
		isModalDialogOpened: false,
	};

	onBidAdd = () => this.setState({ isModalDialogOpened: true });

	onModalDialogClose = () => this.setState({ isModalDialogOpened: false });

	render() {
		const { bids, pageIndex, onPageRequest } = this.props;
		const { isModalDialogOpened } = this.state;

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
					onAddClick={this.onBidAdd}
				/>
				{isModalDialogOpened && (
					<ModalDialog title="title" onClose={this.onModalDialogClose}>content</ModalDialog>
				)}
			</div>
		);
	}
}

export default BidList;
