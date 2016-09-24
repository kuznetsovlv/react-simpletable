import React, {PropTypes, Component} from 'react';

const identity = x => x;

export default class Table extends Component {

	constructor (props) {
		super (props);

		this.addRowHandler = this.addRowHandler.bind(this);
		this.setSortHandler = this.setSortHandler.bind(this);
	}

	addRowHandler () {
		const {props: {addRowHandler = identity}} = this;

		addRowHandler();
	}

	setSortHandler (sortBy, sortDir) {
		const {props: {setSortHandler = identity}} = this;

		setSortHandler({sortBy, sortDir});
	}

	renderTitle (title) {
		return title ?
				(
					<div className="title">
						{title}
					</div>
				) : null;
	}

	renderCell (value = '', key, ...classList) {
		const className = ['cell'].concat(classList).join(' ');

		const [first, second] = classList;

		const clickHandler = first === 'header-cell' ? () => {
			const dir = second === 'ask' ? 'desc' : 'ask';

			return this.setSortHandler(value, dir);
		} : identity;

		return (
			<div key={key}  className="row">
				<div className={className} onClick={clickHandler}>{value}</div>
			</div>
		);
	}

	renderCells (data = [], keyPref) {
		return data.map((x, i) => {
			const key = `${keyPref}-cell-${i}`;

			return this.renderCell(x, key);
		});
	}

	renderColumns (data) {
		return data.map((column = {}, i) => {
			const {name = '', data =[], sort} = column;
			const key = `simple-table-column-${i}`;

			return (
				<div key={key} className="col">
					{this.renderCell(name, `${key}-header`, 'header-cell', sort)}
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