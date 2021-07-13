// data used in App.js
export const nav_items = [
	{
		name: 'About',
		indexNumber: 0,
		isCurrent: true
	},
	{
		name: 'Resume',
		indexNumber: 1,
		isCurrent: false
	},
	{
		name: 'Portfolio',
		indexNumber: 2,
		isCurrent: false
	}
];

export const convertToArray = (stringVar) => {
	let type = typeof stringVar;
	if (type !== 'string') {
		return new Error(`Expected a string for ${stringVar} and instead received ${type}`);
	}
	let newArray = stringVar.split(',');
	return newArray;
};
