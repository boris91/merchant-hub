export const GET_MERCHANT = 'GET_MERCHANT';

export const getMerchant = (id) => ({
	type: GET_MERCHANT,
	id,
});

export const UNSELECT_MERCHANT = 'UNSELECT_MERCHANT';

export const unselectMerchant = () => ({
	type: UNSELECT_MERCHANT,
});

export const GET_MERCHANTS = 'GET_MERCHANTS';

export const getMerchants = pageIndex => ({
	type: GET_MERCHANTS,
	pageIndex,
});

export const ADD_MERCHANT = 'ADD_MERCHANT';

export const addMerchant = merchant => ({
	type: ADD_MERCHANT,
	merchant,
});

export const EDIT_MERCHANT = 'EDIT_MERCHANT';

export const editMerchant = (id, updates) => ({
	type: EDIT_MERCHANT,
	id,
	updates,
});

export const REMOVE_MERCHANT = 'REMOVE_MERCHANT';

export const removeMerchant = (id) => ({
	type: REMOVE_MERCHANT,
	id,
});
