import React, {PropTypes, Component}	from 'react';
import {connect}						from 'react-redux';
import { bindActionCreators }           from 'redux';
import Table							from './Table';
import {createTableData, addRow}		from './dataLib';
import * as actions						from './actions';

const defaultData = createTableData(12, 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7');

class TableContainer extends Component {

	constructor (props) {
		super (props);

		const {dispatch} = props;

		this.actions = bindActionCreators(actions, dispatch);
	}

	render () {
		const {props} = this;

		return (
			<Table
				{...props}
				title="Simple Table"
				setSortHandler={this.actions.resort}
				addRowHandler={this.actions.addRow}
			/>
		);
	}
}

function mapStateToProps ({data = defaultData, sort = {}, exchange, rowAdd}) {
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
	

	return {data: rowAdd ? addRow(resortedData) : resortedData};
}

export default connect(mapStateToProps)(TableContainer);