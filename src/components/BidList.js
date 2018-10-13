import React from 'react';
import PropTypes from 'prop-types';

export const BidList = ({ bids }) => (
	<table className="bid-list">
		<thead className="bid-list__header">
			<th className="bid-list__header-cell">Car title</th>
			<th className="bid-list__header-cell">Amount</th>
			<th className="bid-list__header-cell">Created</th>
		</thead>
		<tbody>
			{
				bids.map(({ id, carTitle, amount, created }) => (
					<tr className="bid-list__bid" key={id}>
						<td className="bid-list__bid-cell">{carTitle}</td>
						<td className="bid-list__bid-cell">{amount}</td>
						<td className="bid-list__bid-cell">{created}</td>
					</tr>
				))
			}
		</tbody>
	</table>
);

BidList.propTypes = {
	bids: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		carTitle: PropTypes.string,
		amount: PropTypes.number,
		created: PropTypes.string,
	})),
};

export default BidList;
