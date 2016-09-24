const LIM = 100000;

function createColumn (name = '', length = 0) {
	const data = [];

	for (let i = 0; i < length; ++i)
		data.push((Math.random() * LIM) >> 0);

	return {name, data};
}

export const createTableData = (rowNum = 0, ...colNames) => colNames.map(name => createColumn(name, rowNum));

export const addRow = (data = []) => data.map((d = {}) => {
	const {data = []} = d;

	data.push((Math.random() * LIM) >> 0);

	return {...d, data};
});