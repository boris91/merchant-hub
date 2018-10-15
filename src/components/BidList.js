import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../components';

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

export const BidList = ({ bids, pageIndex, onPageRequest }) => (
	<DataTable
		title="Bids"
		itemName="bid"
		columns={bidTableColumns}
		rows={bids.slice(pageIndex * 5, pageIndex * 5 + 5)}
		pagesCount={Math.ceil(bids.length / 5)}
		countPerPage={5}
		pageIndex={pageIndex}
		onPageRequest={onPageRequest}
	/>
);

BidList.propTypes = {
	bids: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		carTitle: PropTypes.string,
		amount: PropTypes.number,
		created: PropTypes.string,
	})),
	pageIndex: PropTypes.number,
	onPageRequest: PropTypes.func,
};

BidList.defaultProps = {
	bids: [],
	pageIndex: 0,
	onPageRequest() {},
};

export default BidList;
