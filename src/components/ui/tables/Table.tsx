import React from 'react';
import TableBody from './TableBody';
import TableHeaders from './TableHeaders';
import TableFooter from './TableFooter';
import type Headers from '../../../types/react-ui-elements/table-headers';
import '../tables/tables.scss';

type Props = {
	// tbody: React.FC<any>;
	data: any[];
	onRowClickHandler: (id: any) => void;
	headers: Headers[];
	isSortable: boolean;
	sortFunction: (header: any, isAscending: any) => void;
	initialSorting: `${boolean} - ${string}`;
	count: number;
	rowsPerPage: number;
	pageTitle: string;
};

const Table = (props: Props) => {
	return (
		<>
			<div className='table-container'>
				<table>
					<TableHeaders
						headers={props.headers}
						isSortable={props.isSortable}
						sortFunction={props.sortFunction}
						initialSorting={props.initialSorting}
					/>
					<TableBody
						data={props.data}
						headers={props.headers}
						onRowClickHandler={props.onRowClickHandler}
					/>
				</table>
			</div>
			<TableFooter
				count={props.count}
				rowsPerPage={props.rowsPerPage}
				pageTitle={props.pageTitle}
				pages={Math.ceil(props.count / props.rowsPerPage)}
			/>
		</>
	);
};

export default Table;
