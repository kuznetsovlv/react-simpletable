import React, {PropTypes, Component}	from 'react';
import {connect}						from 'react-redux';
import { bindActionCreators }           from 'redux';
import Table							from './Table';
import * as actions						from './actions';

class TableContainer extends Component {

	constructor (props) {
		super (props);

		const {dispatch} = props;

		this.actions = bindActionCreators(actions, dispatch);
	}

	componentDidMount() {
		this.actions.init()      ;
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

function mapStateToProps ({data = []}) {
	
	

	// const resortedData = data.map((d = {}) => {
	// 	d.sort = d.name === sortBy ? sortDir : null;

	// 	if (sortCol) {
	// 		const k = sortDir === 'ask' ? 1 : -1;
			
	// 		const {data} = d;

	// 		d.data = data.map((x, i) => {return {x, i}}).sort((a, b) => k * (sortCol[a.i] - sortCol[b.i])).map(({x}) => x);
	// 	}

	// 	return d;
	// });
	

	// return {data: rowAdd ? : resortedData};

	return {data};
}

export default connect(mapStateToProps)(TableContainer);