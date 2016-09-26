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
				columnMoveHandler={this.actions.moveColumn}
			/>
		);
	}
}

function mapStateToProps ({data = []}) {
	
	return {data};
}

export default connect(mapStateToProps)(TableContainer);