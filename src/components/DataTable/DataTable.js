import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import './DataTable.css';

const renderCellContent = value => {
	let content;

	switch (typeof value) {
		case 'boolean':
			content = <input type="checkbox" checked={value} readOnly style={{ pointerEvents: 'none' }}/>;
			break;
		case 'string':
			content = (/(.*\.(?:png|jpg))/i.test(value)) ? (
				<div className="data-table__row-cell-image" style={{ backgroundImage: `url(${value})` }} />
			) : value;
			break;
		default:
			content = value;
	}

	return content;
};

export const DataTable = ({
	columns,
	rows,
	title,
	itemName,
	pageIndex,
	pagesCount,
	countPerPage,
	onPageRequest,
	onRowClick,
	onAddClick,
	readonly,
}) => (
	<div className="data-table">
		{!!title && <div className="data-table__title">{title}</div>}
		<div className="data-table__header">
			{columns.map(({ label, width }, colIndex) => (
				<div
					className="data-table__header-cell"
					style={{ width }}
					key={`data_table.header_cell.${colIndex}`}
				>
					{label}
				</div>
			))}
		</div>
		{rows.length ? (Array(countPerPage + 1).join().split('').map((el, rowIndex) => (
			<div
				className={`data-table__row${rows[rowIndex] ? '' : ' data-table__row_empty'}`}
				onClick={rows[rowIndex] ? () => onRowClick(rows[rowIndex].id || rowIndex) : () => {}}
				key={`data_table.row.${rowIndex}`}
			>
				{columns.map(({ name, width }, colIndex) => (
					<div
						className="data-table__row-cell"
						style={{ width }}
						key={`data_table.cell.${rowIndex}.${colIndex}`}
					>
						{!!rows[rowIndex] && renderCellContent(rows[rowIndex][name])}
					</div>
				))}
			</div>
		))) : (
			<span className="data-table__placeholder">No items yet.</span>
		)}
		{(pagesCount > 1) && (
			<div className="data-table__nav">
				<Button
					className="data-table__nav-button"
					label="< prev"
					onClick={pageIndex > 0 ? () => onPageRequest(pageIndex - 1) : () => {}}
					disabled={pageIndex <= 0}
				/>
				<span className="data-table__nav-counter">
					{`${pageIndex + 1} / ${pagesCount}`}
				</span>
				<Button
					className="data-table__nav-button"
					label="next >"
					onClick={pageIndex < pagesCount - 1 ? () => onPageRequest(pageIndex + 1) : () => {}}
					disabled={pageIndex >= pagesCount - 1}
				/>
			</div>
		)}
		{!readonly && (
			<Button
				className="data-table__add-button"
				kind="success"
				thick
				label={`Add new ${itemName}`}
				onClick={onAddClick}
			/>
		)}
	</div>
);

DataTable.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		label: PropTypes.string,
		width: PropTypes.number,
	})).isRequired,
	rows: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
	})),
	title: PropTypes.string,
	itemName: PropTypes.string,
	readonly: PropTypes.bool,
	pageIndex: PropTypes.number,
	pagesCount: PropTypes.number,
	countPerPage: PropTypes.number,
	onPageRequest: PropTypes.func,
	onRowClick: PropTypes.func,
	onAddClick: PropTypes.func,
};

DataTable.defaultProps = {
	rows: [],
	title: '',
	itemName: 'item',
	readonly: false,
	pageIndex: 0,
	pagesCount: 1,
	countPerPage: 5,
	onPageRequest(pageIndex) {},
	onRowClick(id) {},
	onAddClick() {},
};

export default DataTable;