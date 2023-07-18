import mainLogo from '../../../assets/media/logos/logo-main.svg';
import type Movie from '../../../types/movie';
import type Headers from '../../../types/react-ui-elements/table-headers';
import '../tables/tables.scss';
import { useNavigate } from 'react-router-dom';
import ArrowUpIcon from '../../../assets/media/icons/ArrowUpIcon';
import { useState, useEffect } from 'react';
import IconButton from '../buttons/icon-button/IconButton';
import ArrowDownIcon from '../../../assets/media/icons/ArrowDownIcon';

type Props = {
	headers: Headers[];
	data: Movie[];
	isSortable: boolean;
};

const MoviesTableComponent = (props: Props) => {
	const [data, setData] = useState(props.data);
	const [lastClickedButton, setLastClickedButton] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		setData(props.data);
	}, [props.data]);

	const editMovieHandler = (id: any) => {
		// dispatch(moviesActions.getMovieToSendId(id));
		navigate(`/movie/${id}`);
	};

	const sortArray = (header: Headers, isAscending: boolean) => {
		const sortedData = [...data];
		const order = isAscending ? 1 : -1;

		if (header.type === 'string') {
			sortedData.sort((a, b) => order * a.title.localeCompare(b.title));
		} else if (header.type === 'number') {
			sortedData.sort((a, b) => order * (Number(a.rating) - Number(b.rating)));
		} else if (header.type === 'date') {
			sortedData.sort(
				(a, b) =>
					order *
					(new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
			);
		}

		setData(sortedData);
		setLastClickedButton(
			`${isAscending ? 'ascending' : 'descending'} - ${header.databaseTitle}`
		);
	};

	return (
		<div className='table-container'>
			<table>
				<thead>
					<tr>
						{props.headers.map((header) => (
							<th key={header.databaseTitle}>
								{header.databaseTitle === '' ? null : (
									<div className='sorting-buttons-wrapper'>
										{header.databaseTitle}
										{props.isSortable === true ? (
											<div className='sorting-buttons'>
												<IconButton
													className={
														lastClickedButton ===
														`ascending - ${header.databaseTitle}`
															? 'active'
															: ''
													}
													type='button'
													onClick={() => sortArray(header, true)}
													title={`Sort the movies table by ascending ${header.databaseTitle.toLowerCase()} order`}
													disabled={false}
													ariaLive='assertive'
													icon={<ArrowUpIcon />}
												/>
												<IconButton
													type='button'
													onClick={() => sortArray(header, false)}
													className={
														lastClickedButton ===
														`descending - ${header.databaseTitle}`
															? 'active'
															: ''
													}
													title={`Sort the movies table by descending ${header.databaseTitle.toLowerCase()} order`}
													disabled={false}
													ariaLive='assertive'
													icon={<ArrowDownIcon />}
												/>
											</div>
										) : null}
									</div>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.id} onClick={() => editMovieHandler(row.id)}>
							<td>
								<img
									className='main-logo'
									src={mainLogo}
									alt='website logo'
									loading='lazy'
									inline-size='169'
									block-size='150'
								/>
							</td>
							<td>{row.title}</td>
							<td>{row.rating} / 10</td>
							<td>{new Date(row.release_date).getFullYear().toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MoviesTableComponent;
