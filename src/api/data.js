const firstNames = [
	'Robert',
	'John',
	'Jack',
	'Christopher',
	'Steven',
	'Andy',
	'Kurt',
];

const lastNames = firstNames.map(firstName => firstName + 'son');

const getRandomLengthArray = () => Array(10 + Math.round(Math.random() * 10)).join().split('');

const getRandomName = names => names[Math.floor(Math.random() * names.length)];

export const generateId = (item, index, ...props) => (
	props.map(key => item[key]).join('_') + '.' + index
);

export const merchants = getRandomLengthArray().map((el, mIndex) => {
	const firstname = getRandomName(firstNames);
	const lastname = getRandomName(lastNames);
	return {
		id: `${firstname}_${lastname}.${mIndex}`,
		firstname,
		lastname,
		avatarUrl: '../default-avatar.png',
		email: `${firstname.toLowerCase()}_${lastname.toLowerCase()}.${mIndex}@gmail.com`,
		phone: `+37529123456${mIndex}`,
		hasPremium: Math.random() >= 0.5,
		bids: getRandomLengthArray().map((el, bIndex) => ({
			id: `Bid.${mIndex}.${bIndex}`,
			carTitle: `Car (${mIndex}) (${bIndex})`,
			amount: Math.round(Math.random() * 10),
			created: new Date(2018, 0, Math.min(bIndex, 31)).toDateString(),
		})),
	};
});
