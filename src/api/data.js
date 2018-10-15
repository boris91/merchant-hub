import { getFormattedDate } from '../utils/date';

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

const carTitles = [
	'BMW X5 e53',
	'BMW X5 e70',
	'BMW X5 f15',
	'BMW X5 f85',
	'BMW X5 g05',
	'BMW X6 e71',
	'BMW X6 f16',
	'BMW X6 f86',
	'BMW X6 g06',
];

const getRandomLengthArray = () => Array(10 + Math.round(Math.random() * 10)).join().split('');

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

export const generateId = (item, index, ...props) => (
	props.map(key => item[key]).join('_') + '.' + index
);

export const merchants = getRandomLengthArray().map((el, mIndex) => {
	const firstname = getRandomItem(firstNames);
	const lastname = getRandomItem(lastNames);
	const id = `${firstname}_${lastname}.${mIndex}`;
	return {
		id,
		firstname,
		lastname,
		avatarUrl: '../default-avatar.png',
		email: `${firstname.toLowerCase()}_${lastname.toLowerCase()}.${mIndex}@gmail.com`,
		phone: `+37529123456${mIndex}`,
		hasPremium: Math.random() >= 0.5,
		bids: getRandomLengthArray().map((el, bIndex) => ({
			id: `Bid.${id}.${bIndex}`,
			carTitle: getRandomItem(carTitles),
			amount: 1 + Math.round(Math.random() * 10),
			created: getFormattedDate(2018, 0, Math.min(bIndex, 31)),
		})),
	};
});

export default merchants;
