import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, ModalDialog, DataForm } from '../../components';
import './BidList.css';

const { FieldType } = DataForm;

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

const BidPropType = PropTypes.shape({
	id: PropTypes.string,
	carTitle: PropTypes.string,
	amount: PropTypes.number,
	created: PropTypes.string,
});

export class BidList extends React.Component {
	static propTypes = {
		bids: PropTypes.arrayOf(BidPropType),
		bidSelected: BidPropType,
		pageIndex: PropTypes.number,
		readonly: PropTypes.bool,
		onPageRequest: PropTypes.func,
		onSelect: PropTypes.func,
		onUnselect: PropTypes.func,
		onAdd: PropTypes.func,
	};

	static defaultProps = {
		bids: [],
		bidSelected: null,
		pageIndex: 0,
		readonly: false,
		onPageRequest() {},
		onSelect() {},
		onUnselect() {},
		onAdd() {},
	};

	render() {
		const { bids, pageIndex, bidSelected, onPageRequest, readonly, onSelect, onUnselect, onAdd } = this.props;

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
					onRowClick={onSelect}
					readonly={readonly}
				/>
				{!!bidSelected && (
					<ModalDialog
						title="Bid"
						onClose={onUnselect}
					>
						<DataForm
							fields={bidFormFields}
							data={bidSelected}
							backNav={false}
							onCancel={onUnselect}
						/>
					</ModalDialog>
				)}
			</div>
		);
	}
}

export default BidList;
