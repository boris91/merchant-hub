import preloadedState from '../preloadedState';
import * as actions from '../actions';
import { merchantApi } from '../api';

export default (state = preloadedState, action) => {
	switch(action.type) {
		case actions.GET_MERCHANTS: {
			const { pageIndex } = action;
			return {
				...state,
				merchants: merchantApi.readRange(pageIndex),
				merchantsPageIndex: pageIndex,
				merchantsPagesCount: merchantApi.pagesCount(),
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

		default:
			return state;
	}
};