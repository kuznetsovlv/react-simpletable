import React, {PropTypes, Component}	from 'react';
import {connect}						from 'react-redux';
import { bindActionCreators }           from 'redux';
import Table							from './Table';
import {createTableData, addRow}		from './dataLib';


class TableContainer extends Component {

	constructor (props) {
		super (props);
	}

	render () {
		const {props} = this;

		return (
			<Table {...props} title="Simple Table"/>
		);
	}
}

function mapStateToProps (state) {
	console.log(state);

	const {updateTable = {}} = state;
	const {data = createTableData(12, 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'), sort = {}, exchange, rowAdd} = updateTable;
	const {sortBy = 'col4', sortDir = 'ask'} = sort;

	const sortCol = data.reduce((o, {name, data}) => (name === sortBy ? data : o), null);

	data.forEach((d = {}) => {
		d.sort = d.name === sortBy ? sortDir : null;

		if (sortCol) {
			const k = sortDir === 'ask' ? 1 : -1;
			
			const {data} = d;

			d.data = data.map((x, i) => {return {x, i}}).sort((a, b) => k * (sortCol[a.i] - sortCol[b.i])).map(({x}) => x);
		}
	});
	

	return {data: rowAdd ? addRow(data) : data};
}

export default connect(mapStateToProps)(TableContainer);