import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../components';

const merchantTableColumns = [{
	name: 'avatar',
	width: 30,
}, {
	name: 'fullName',
	label: 'Full name',
	width: 235,
}, {
	name: 'hasPremium',
	label: 'Has premium',
	width: 120,
}, {
	name: 'bidsCount',
	label: 'Bids count',
	width: 120,
}];

export default class MerchantList extends React.Component {
	static propTypes = {
		merchants: PropTypes.arrayOf(PropTypes.shape({
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
		})).isRequired,
		merchantsPageIndex: PropTypes.number.isRequired,
		merchantsPagesCount: PropTypes.number.isRequired,
		getMerchants: PropTypes.func.isRequired,
		unselectMerchant: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func,
		}).isRequired,
	};

	componentDidMount() {
		const { getMerchants, merchantsPageIndex } = this.props;
		getMerchants(merchantsPageIndex);
	}

	onMerchantSelect = id => {
		const { history } = this.props;
		history.push(`/merchant/details/${id}`);
	};

	onMerchantAdd = () => {
		const { history, unselectMerchant } = this.props;
		unselectMerchant();
		history.push(`/merchant/create`);
	};

	render() {
		const { merchants, merchantsPageIndex, merchantsPagesCount, merchantsCountPerPage, getMerchants } = this.props;

		return (
			<DataTable
				title="merchants"
				columns={merchantTableColumns}
				rows={merchants.map(({ id, avatarUrl, firstname, lastname, hasPremium, bids }) => ({
					avatar: avatarUrl,
					fullName: `${firstname} ${lastname}`,
					hasPremium,
					bidsCount: bids.length,
					id,
				}))}
				pageIndex={merchantsPageIndex}
				pagesCount={merchantsPagesCount}
				countPerPage={merchantsCountPerPage}
				onPageRequest={getMerchants}
				onRowClick={this.onMerchantSelect}
				onAddClick={this.onMerchantAdd}
			/>
		);
	}
}
