import { merchants } from './data';

export default {
	create(merchantId, bid) {
		const merchant = merchants.find(( id ) => id === merchantId);
		merchant.bids.push(bid);
		return bid;
	},

	update(merchantId, id, bidUpdates) {
		const merchant = merchants.find(({ id }) => id === merchantId);
		const bid = merchant.bids.find(({ id: bId }) => bId === id);
		return Object.assign(bid, bidUpdates);
	},

	delete(merchantId, id) {
		const merchant = merchants.find(({ id: mId }) => mId === id);
		const bidIndex = merchant.bids.findIndex(({ id: bId }) => bId === id);
		return merchants.bids.splice(bidIndex, 1)[0];
	},
};