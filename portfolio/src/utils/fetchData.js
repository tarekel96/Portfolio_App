export const asyncFetchData = async (url, setData) => {
	const res = await fetch(url);
	const data = await res.json();
	setData(() => data);
};
export const convertToArray = (stringVar) => {
	let type = typeof stringVar;
	if (type !== 'string') {
		return new Error(`Expected a string for ${stringVar} and instead received ${type}`);
	}
	let newArray = stringVar.split(',');
	return newArray;
};
