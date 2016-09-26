import * as actionType				from './actionTypes';
import {createTableData, addRow}	from './dataLib';
import * as constants				from './constants';

function sortData (state = {}, sort = {}) {
	const {data = []} = state;
	const {sortBy, sortDir = 'ask'} = sort;

	const sortCol = data.reduce((o, {name, data}) => (name === sortBy ? data : o), null);

	const resortedData = data.map((d = {}) => {
		d.sort = d.name === sortBy ? sortDir : null;

		if (sortCol) {
			const k = sortDir === 'ask' ? 1 : -1;
			
			const {data} = d;

			d.data = data.map((x, i) => {return {x, i}}).sort((a, b) => k * (sortCol[a.i] - sortCol[b.i])).map(({x}) => x);
		}

		return d;
	});

	return {...state, data: resortedData};
}

function addNewRow (state = {}) {
	const {data = []} = state;

	const clearedData = data.map((d = {}) => {
		const {sort, ...rest} = d;

		return rest;
	});

	return {...state, data: addRow(clearedData)};
}

function getDest (index = 0, dir, last = 0) {

	switch (dir) {
		case constants.COLUMN_MOVE_LEFT: return index > 0 ? --index : Math.max(0, last);
		case constants.COLUMN_MOVE_RIGHT: return index < last ? ++index : 0;
	}

	return index;
}

function moveColumn (state = {}, payload = {}) {
	const {data = []} = state;
	const {col, dir} = payload;

	const column = data.reduce((o, c) => (c.name === col ? c : o), null);
	const index = data.indexOf(column);

	const dest = getDest(index, dir, data.length - 1);

	const destColumn = data[dest];

	const reorderedData = data.map((d, i) => {
		switch (i) {
			case index: return destColumn;
			case dest: return column;
		}

		return d;
	});

	return {...state, data: reorderedData};
}


export default function updateTable (state = {}, {type, payload = {}}) {

	switch (type) {
		case actionType.INIT: return {...state, data: createTableData(12, 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7')};
		case actionType.RESORTING: return sortData(state, payload.sort);
		case actionType.ROW_ADD: return addNewRow(state);
		case actionType.COLUMN_MOVE: return moveColumn(state, payload);
	}

	return state;
}