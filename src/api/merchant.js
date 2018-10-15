import { generateId } from './data';

export default class MerchantApi {
	constructor(data) {
		this.merchants = data;
	}

	create(merchant) {
		const {
			firstname = '',
			lastname = '',
			avatarUrl = '../default-avatar.png',
			email = '',
			phone = '',
			hasPremium = false,
			bids = [],
		} = merchant;

		this.merchants.push({
			firstname,
			lastname,
			avatarUrl,
			email,
			phone,
			hasPremium,
			bids,
			id: generateId(merchant, this.merchants.length, 'firstname', 'lastname'),
		});

		return merchant;
	}

	read(id) {
		return this.merchants.find(({ id: mId }) => mId === id);
	}

	readRange(pageIndex, count = this.countPerPage()) {
		const startIndex = pageIndex * count;
		return this.merchants.slice(startIndex, startIndex + count);
	}

	update(id, merchantUpdates) {
		const merchant = this.merchants.find(({ id: mId }) => mId === id);
		return Object.assign(merchant, merchantUpdates);
	}

	delete(id) {
		const merchantIndex = this.merchants.findIndex(({ id: mId }) => mId === id);
		return this.merchants.splice(merchantIndex, 1)[0];
	}

	count() {
		return this.merchants.length;
	}

	pagesCount() {
		return Math.ceil(this.count() / this.countPerPage());
	}

	countPerPage() {
		return 5;
	}
};