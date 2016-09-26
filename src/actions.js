import * as actionType	from './actionTypes';

export function init () {
	return {
		type: actionType.INIT
	}
}

export function resort (sort = {}) {
	return {
		type: actionType.RESORTING,
		payload: {sort}
	}
}

export function addRow () {
	return {
		type: actionType.ROW_ADD
	}
}