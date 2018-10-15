import preloadedState from '../preloadedState';
import * as actions from '../actions';
import { merchantApi, bidApi } from '../api';

export default (state = preloadedState, action) => {
	switch(action.type) {
		case actions.GET_MERCHANTS: {
			let { pageIndex } = action;
			const pagesCount = merchantApi.pagesCount();
			if (pageIndex > pagesCount - 1 && pagesCount > 0) {
				pageIndex--;
			}
			return {
				...state,
				merchants: merchantApi.readRange(pageIndex),
				merchantsPageIndex: pageIndex,
				merchantsPagesCount: pagesCount,
				merchantsCountPerPage: merchantApi.countPerPage(),
			};
		}

		case actions.GET_MERCHANT: {
			const {id} = action;
			return {
				...state,
				merchantSelected: merchantApi.read(id),
			};
		}

		case actions.ADD_MERCHANT: {
			const { merchant } = action;
			merchantApi.create(merchant);
			return {
				...state,
				merchantsPageIndex: merchantApi.pagesCount() - 1,
			};
		}

		case actions.UNSELECT_MERCHANT: {
			return {
				...state,
				merchantSelected: null,
			};
		}

		case actions.EDIT_MERCHANT: {
			const { id, updates } = action;
			const { merchants } = state;
			const updatedMerchant = merchantApi.update(id, updates);
			const merchantIndex = merchants.findIndex(({ id: mId }) => mId === id);
			return {
				...state,
				merchants: [
					...merchants.slice(0, merchantIndex - 1),
					updatedMerchant,
					...merchants.slice(merchantIndex + 1),
				],
			};
		}

		case actions.REMOVE_MERCHANT: {
			const { id } = action;
			merchantApi.delete(id);
			return {
				...state,
			};
		}

		case actions.ADD_BID: {
			const { bid } = action;
			const { merchantSelected: { id: merchantId } } = state;
			const merchantSelected = bidApi.create(merchantId, bid);
			return {
				...state,
				merchantSelected,
			};
		}

		case actions.EDIT_BID: {
			const { id, updates } = action;
			const { merchantSelected: { id: merchantId } } = state;
			return {
				...state,
				merchantSelected: bidApi.update(merchantId, id, updates),
			};
		}

		case actions.REMOVE_BID: {
			const { id } = action;
			const { merchantSelected: { id: merchantId } } = state;
			return {
				...state,
				merchantSelected: bidApi.delete(merchantId, id),
			};
		}

		default:
			return state;
	}
};