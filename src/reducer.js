import * as actionType	from './actionTypes';

export default function updateTable (state = {}, {type, payload = {}}) {
	const {sort, exchange, rowAdd, ...clearedState} = state;
	const {data = []} = payload;

	switch (type) {
		case actionType.RESORTING: return {...clearedState, data, sort: payload.sort};
		case actionType.ROW_ADD: return {...clearedState, data, rowAdd: true};
	}

	return clearedState;
}