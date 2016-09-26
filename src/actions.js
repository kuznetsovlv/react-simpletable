import * as actionType	from './actionTypes';

/**
 * Action method to initialize.
 * @return {Object} - initialize action.
 */
export function init () {
	return {
		type: actionType.INIT
	}
}

/**
 * Action method to sort table.
 * @return {Object} - sorting action.
 */
export function resort (sort = {}) {
	return {
		type: actionType.RESORTING,
		payload: {sort}
	}
}

/**
 * Action method to add row into table.
 * @return {Object} - adding action.
 */
export function addRow () {
	return {
		type: actionType.ROW_ADD
	}
}

/**
 * Action method to move column.
 * @return {Object} - moving action.
 */
export function moveColumn (col, dir) {
	return {
		type: actionType.COLUMN_MOVE,
		payload: {col, dir}
	}
}