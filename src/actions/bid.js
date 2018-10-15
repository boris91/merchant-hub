export const ADD_BID = 'ADD_BID';

export const addBid = bid => ({
	type: ADD_BID,
	bid,
});

export const EDIT_BID = 'EDIT_BID';

export const editBid = (id, updates) => ({
	type: EDIT_BID,
	id,
	updates,
});

export const REMOVE_BID = 'REMOVE_BID';

export const removeBid = id => ({
	type: REMOVE_BID,
	id,
});