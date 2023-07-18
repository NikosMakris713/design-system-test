import type Movie from '../../../types/movie';
import type Headers from '../../../types/react-ui-elements/table-headers';

type Props = {
	data: Movie[];
	onRowClickHandler: (id: any) => void;
	headers: Headers[];
};

const TableBody = (props: Props) => {
	return (
		<tbody>
			{props.data.map((row) => (
				<tr
					key={row.id}
					onClick={() => {
						props.onRowClickHandler(row.id);
					}}>
					{props.headers.map((header) => (
						<td key={header.databaseTitle}>{row[header.databaseTitle]}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
