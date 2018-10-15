export const ADD_BID = 'ADD_BID';

export const addBid = (merchantId, carTitle, amount) => ({
	type: ADD_BID,
	merchantId,
	carTitle,
	amount,
	created: new Date().toDateString(),
});

export const EDIT_BID = 'EDIT_BID';

export const editBid = (merchantId, id, updates) => ({
	type: EDIT_BID,
	merchantId,
	id,
	updates,
});

export const REMOVE_BID = 'REMOVE_BID';

export const removeBid = (merchantId, id) => ({
	type: REMOVE_BID,
	merchantId,
	id,
});