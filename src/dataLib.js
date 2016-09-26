/*Methods to create table and row data*/

const LIM = 100000;

/**
 * Create column method.
 * @param {String} name - column's name.
 * @param {Number} length - cell quantity
 * @return {Object} - column data.
 */
function createColumn (name = '', length = 0) {
	const data = [];

	for (let i = 0; i < length; ++i)
		data.push((Math.random() * LIM) >> 0);

	return {name, data};
}

/**
 * Table create method.
 * @param {Number} rowNum - quantity of rows.
 * @param {String} ... - names of the columns
 * @return {Array} - array of table's data.
 */
export const createTableData = (rowNum = 0, ...colNames) => colNames.map(name => createColumn(name, rowNum));

/**
 * Method to add row into the table.
 * @params {Array} data - array of table's data.
 * @return {Array} - array of table's data.
 */
export const addRow = (data = []) => data.map((d = {}) => {
	const {data = []} = d;

	data.push((Math.random() * LIM) >> 0);

	return {...d, data};
});