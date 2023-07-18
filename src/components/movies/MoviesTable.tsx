import { useState, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router';
import { useGetMoviesQuery } from '../../store/services/moviesApi';
import Table from '../ui/tables/Table';
import LoadingDataStatus from '../request-status/LoadingDataStatus';
import FailedHttpRequestStatus from '../request-status/FailedHttpRequestStatus';
import NoResultsFound from '../request-status/NoResultsFound';
import { useParams } from 'react-router';
import type GetRequestArguements from '../../types/get-request-arguements';

type Props = {};

const MoviesTable = (props: Props) => {
	const navigate = useNavigate();
	const { pageNumber }: any = useParams();
	const [orderBy, setOrderBy] = useState('title');
	const [isAscending, setIsAscending] = useState(true);
	const [rangeFrom, setRangeFrom] = useState<number>((pageNumber - 1) * 10);
	const [rangeTo, setRangeTo] = useState<number>(rangeFrom + 9);

	const args: GetRequestArguements = {
		orderBy,
		isAscending,
		rangeFrom,
		rangeTo,
	};

	const { data, isError, isLoading, isSuccess, error } = useGetMoviesQuery(args);

	const func = (id: string) => {
		navigate(`/movie/edit/${id}`);
	};

	const sortFunction = (header: any, isAscending: any) => {
		setIsAscending(isAscending);
		setOrderBy(header);
	};

	useEffect(() => {
		if (!pageNumber) {
			redirect('movies/page/1');
		}

		const newRangeFrom = (pageNumber - 1) * 10;
		const newRangeTo = newRangeFrom + 9;
		setRangeFrom(newRangeFrom);
		setRangeTo(newRangeTo);
	}, [pageNumber]);

	return (
		<div className='container-large'>
			{isLoading ? (
				<LoadingDataStatus />
			) : isError ? (
				<FailedHttpRequestStatus requestResponseStatus={'Something went wrong'} />
			) : isSuccess && Array.isArray(data) && !(data.length > 0) ? (
				<NoResultsFound />
			) : (
				<Table
					data={data?.movies as any}
					onRowClickHandler={func}
					headers={[
						{ databaseTitle: 'title', type: 'string', displayTitle: 'Title' },
						{ databaseTitle: 'rating', type: 'number', displayTitle: 'Rating' },
						{
							databaseTitle: 'release_date',
							type: 'date',
							displayTitle: 'Release Year',
						},
					]}
					isSortable={true}
					sortFunction={sortFunction}
					initialSorting={`${true} - title`}
					rowsPerPage={10}
					count={data?.count as number}
					pageTitle='movies'
				/>
			)}
		</div>
	);
};

export default MoviesTable;
