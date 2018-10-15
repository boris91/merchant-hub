export default class BidApi {
	constructor(data) {
		this.merchants = data;
	}

	create(merchantId, bid) {
		const merchant = this.merchants.find(({ id }) => id === merchantId);
		const {
			carTitle = '',
			amount = 0,
			created = new Date().toDateString(),
		} = bid;
		merchant.bids.push({
			id: `Bid.${merchant.id}.${Math.random() * 1000}`,
			carTitle,
			amount,
			created,
		});
		return merchant;
	}

	update(merchantId, id, bidUpdates) {
		const merchant = this.merchants.find(({ id }) => id === merchantId);
		const bid = merchant.bids.find(({ id: bId }) => bId === id);
		Object.assign(bid, bidUpdates);
		return merchant;
	}

	delete(merchantId, id) {
		const merchant = this.merchants.find(({ id: mId }) => mId === id);
		const bidIndex = merchant.bids.findIndex(({ id: bId }) => bId === id);
		return this.merchants.bids.splice(bidIndex, 1)[0];
	}
};