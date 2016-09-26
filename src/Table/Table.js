import React, {PropTypes, Component}	from 'react';
import * as constants					from '../constants';

/**
 * Default method for handlers.
 * @param {*} x - any value.
 * @return {*} - first argument
 */
const identity = x => x;

/**
 * Table created class
 * @param {Object} props - component's props.
 * @param {String} [props#title] - table's title.
 * @param {Array} [props#data] - array of column's data
 */
export default class Table extends Component {

	static PropTypes = {
		title: PropTypes.string,
		data: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			data: PropTypes.arrayOf(PropTypes.number),
			sort: PropTypes.oneOf(['ask', 'desc'])
		}))
	}

	constructor (props) {
		super (props);

		this.addRowHandler = this.addRowHandler.bind(this);
		this.setSortHandler = this.setSortHandler.bind(this);
		this.columnMoveHandler = this.columnMoveHandler.bind(this);
	}

	/**
	 * Method to handle "Add row" click event.
	 */
	addRowHandler () {
		const {props: {addRowHandler = identity}} = this;

		addRowHandler();
	}

	/**
	 * Method to handle change sort type event.
	 */
	setSortHandler (sortBy, sortDir) {
		const {props: {setSortHandler = identity}} = this;

		setSortHandler({sortBy, sortDir});
	}

	/**
	 * Method to handle clumn move event.
	 */
	columnMoveHandler (col, dir) {
		const {props: {columnMoveHandler = identity}} = this;

		columnMoveHandler(col, dir);
	}

	/**
	 * Method to render titte.
	 * @param {String} title - table's title
	 * @return {Element | null} - title react component
	 */
	renderTitle (title) {
		return title ?
				(
					<div className="title">
						{title}
					</div>
				) : null;
	}

	/**
	 * Method to render header's cell.
	 * @param {String} value - column's title.
	 * @param {String} key - component's key, we do not need it here but use to uniformity.
	 * @param {String} [sort] - argument to show if table sorted by this column and in what direction.
	 * @return {Element} - column header react element.
	 */
	renderHeaderCell (value = '', key, sort) {
		const className = sort ? `cell header-cell ${sort}` : 'cell header-cell';

		/**
		 * Click handler for setting sort direction.
		 * @return {Function} - set sort direction handler
		 */
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

	/**
	 * Method to render common cell.
	 * @param {Array} data - array of column data
	 * @param {String} keyPref - key preffix to elements created from array.
	 * @return {Element} - column react element.
	 */
	renderCells (data = [], keyPref) {
		return data.map((v, i) => (
				<div key={`${keyPref}-cell-${i}`}  className="row">
					<div className="cell">{v}</div>
				</div>
			)
		);
	}

	/**
	 * Method for rendering columns.
	 * @param {Array} data - array of data to create table.
	 * @return {Element} - react element with table columns.
	 */
	renderColumns (data = []) {
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