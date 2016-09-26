import React, {PropTypes, Component}	from 'react';
import * as constants					from '../constants';

const identity = x => x;

export default class Table extends Component {

	constructor (props) {
		super (props);

		this.addRowHandler = this.addRowHandler.bind(this);
		this.setSortHandler = this.setSortHandler.bind(this);
		this.columnMoveHandler = this.columnMoveHandler.bind(this);
	}

	addRowHandler () {
		const {props: {addRowHandler = identity}} = this;

		addRowHandler();
	}

	setSortHandler (sortBy, sortDir) {
		const {props: {setSortHandler = identity}} = this;

		setSortHandler({sortBy, sortDir});
	}

	columnMoveHandler (col, dir) {
		const {props: {columnMoveHandler = identity}} = this;

		columnMoveHandler(col, dir);
	}

	renderTitle (title) {
		return title ?
				(
					<div className="title">
						{title}
					</div>
				) : null;
	}

	renderHeaderCell (value = '', key, sort) {
		const className = sort ? `cell header-cell ${sort}` : 'cell header-cell';
		const clickHandler = () => {
			const dir = sort === 'ask' ? 'desc' : 'ask';

			return this.setSortHandler(value, dir);
		};

		return (
			<div key={key}  className="row">
				<div className={className}>
					<div className="mover">
						<div className="left" onClick={() => this.columnMoveHandler(value, constants.COLUMN_MOVE_LEFT)}>{"\<"}</div>
						<div className="right" onClick={() => this.columnMoveHandler(value, constants.COLUMN_MOVE_RIGHT)}>{"\>"}</div>
					</div>
					<div className="sorterer" onClick={clickHandler}>{value}</div>
				</div>
			</div>
		);
	}

	renderCells (data = [], keyPref) {
		return data.map((v, i) => (
				<div key={`${keyPref}-cell-${i}`}  className="row">
					<div className="cell">{v}</div>
				</div>
			)
		);
	}

	renderColumns (data) {
		return data.map((column = {}, i) => {
			const {name = '', data =[], sort} = column;
			const key = `simple-table-column-${i}`;

			return (
				<div key={key} className="col">
					{this.renderHeaderCell(name, `${key}-header`, sort)}
					{this.renderCells(data, key)}
				</div>
			);
		});
	}

	render () {
		const {props: {title, data = []}} = this;

		return (
			<div>
				<div className="simple-table">
					{this.renderTitle(title)}
					<div className="row">
						{this.renderColumns(data)}
					</div>
				</div>
				<div className="row row-add" onClick={this.addRowHandler}> 
					Add row.
				</div>
			</div>
		);
	}
}