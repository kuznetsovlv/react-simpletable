import * as actionType	from './actionTypes';

export function resort (sort = {}, data = []) {
	return {
		type: actionType.RESORTING,
		payload: {sort, data}
	}
}

export function addRow (data = []) {
	return {
		type: actionType.ROW_ADD,
		payload: {data}
	}
}