import { merchants, generateId } from './data';

export default {
	create(merchant) {
		merchants.push({
			...merchant,
			id: generateId(merchant, merchants.length, 'firstname', 'lastname'),
			bids: merchant.bids || [],
		});
		return merchant;
	},

	read(id) {
		return merchants.find(({ id: mId }) => mId === id);
	},

	readRange(pageIndex, count = this.countPerPage()) {
		const startIndex = pageIndex * count;
		return merchants.slice(startIndex, startIndex + count);
	},

	update(id, merchantUpdates) {
		const merchant = merchants.find(({ id: mId }) => mId === id);
		return Object.assign(merchant, merchantUpdates);
	},

	delete(id) {
		const merchantIndex = merchants.findIndex(({ id: mId }) => mId === id);
		return merchants.splice(merchantIndex, 1)[0];
	},

	count() {
		return merchants.length;
	},

	pagesCount() {
		return Math.ceil(this.count() / this.countPerPage());
	},

	countPerPage() {
		return 5;
	}
};