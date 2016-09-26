import * as actionType				from './actionTypes';
import {createTableData, addRow}	from './dataLib';
import * as constants				from './constants';

/**
 * Method to sort column.
 * @param {Object} state - current state.
 * @param {Object} sort - object with sorting data.
 * @return {Object} - new state.
 */
function sortData (state = {}, sort = {}) {
	const {data = []} = state; //Current table's data.
	const {sortBy, sortDir = 'ask'} = sort; //Sorting data.

	//First select columnt data sort by.
	const sortCol = data.reduce((o, {name, data}) => (name === sortBy ? data : o), null);

	// Sort data.
	const resortedData = data.map((d = {}) => {
		d.sort = d.name === sortBy ? sortDir : null; //If this column is sort for, set sort direction for component view.

		//If sorting column exist, sort data
		if (sortCol) {
			const k = sortDir === 'ask' ? 1 : -1; //Sorting coeficient
			
			const {data = []} = d; //Current column's data.

			//Convert data into array with indexes, sort and conver to columnt data array back.
			d.data = data.map((x, i) => {return {x, i}}).sort((a, b) => k * (sortCol[a.i] - sortCol[b.i])).map(({x}) => x);
		}

		//Return new data
		return d;
	});

	//Return state with new data
	return {...state, data: resortedData};
}

/**
 * Method to add row.
 * @param {Object} state - current state.
 * @return {Object} - new state.
 */
function addNewRow (state = {}) {
	const {data = []} = state; //Current table's data.

	//First clear data from sorting information for correct view.
	const clearedData = data.map((d = {}) => {
		const {sort, ...rest} = d;

		return rest;
	});

	//Return new state with new data.
	return {...state, data: addRow(clearedData)};
}

/**
 * Method to find moving column's destination index.
 * @param {Number} index - current index.
 * @param {String} dir - moving direction.
 * @param {Number} last - index of the last column.
 */
function getDest (index = 0, dir, last = 0) {

	//Columns can move by loop.
	switch (dir) {
		case constants.COLUMN_MOVE_LEFT: return index > 0 ? --index : Math.max(0, last);
		case constants.COLUMN_MOVE_RIGHT: return index < last ? ++index : 0;
	}

	return index;
}

/**
 * Method to move column.
 * @param {Object} state - current state.
 * @param {Object} payload - object with moving column's name and it's moving direction.
 * @return {Object} - new state.
 */
function moveColumn (state = {}, payload = {}) {
	const {data = []} = state; //Current table's data.
	const {col, dir} = payload; //Moving column's name and it's moving direction.

	//First get moving column
	const column = data.reduce((o, c) => (c.name === col ? c : o), null);
	const index = data.indexOf(column); //Next find it's index;

	const dest = getDest(index, dir, data.length - 1); //Get destination index.

	const destColumn = data[dest]; //Get column at this destination index

	//Generate new reordered data
	const reorderedData = data.map((d, i) => {
		//Columns got above must exchange positions
		switch (i) {
			case index: return destColumn;
			case dest: return column;
		}
		// Othe columns do not move or change position.
		return d;
	});
	//Return new state with new data.
	return {...state, data: reorderedData};
}

/**
 * Main reducer.
 */
export default function updateTable (state = {}, {type, payload = {}}) {

	switch (type) {
		//Create initial data.
		case actionType.INIT: return {...state, data: createTableData(12, 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7')};
		case actionType.RESORTING: return sortData(state, payload.sort); //Sort table
		case actionType.ROW_ADD: return addNewRow(state); //Add row.
		case actionType.COLUMN_MOVE: return moveColumn(state, payload); //Move column
	}

	return state;
}