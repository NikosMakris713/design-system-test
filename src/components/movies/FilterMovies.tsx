import { useAppDispatch } from '../../store/hooks';
import { moviesActions } from '../../store/slices/moviesSlice';
import Select from '../ui/select/Select';
import { useSubmit, Form } from 'react-router-dom';

type Props = {
	moviesList: any;
};

const FilterMovies = (props: Props) => {
	const dispatch = useAppDispatch();
	const submit = useSubmit();

	const selectedYearHandler = (event: any) => {
		dispatch(moviesActions.setYearToFilterMoviesBy(event.target.value));
	};

	// Map the release date years of the movies, sort those years and filter out the duplicate years
	const movieYears: any = () => {
		return props.moviesList
			.map((movie: any) => new Date(movie.release_date).getFullYear())
			.sort((a: any, b: any) => b - a)
			.filter((value: any, index: any, dates: any) => dates.indexOf(value) === index);
	};

	return (
		<Form
			onChange={(event) => {
				submit(event.currentTarget);
			}}>
			<Select
				defaultValue='All'
				id='filter-movies-by-year'
				onChange={selectedYearHandler}
				label='Filter by year'>
				<option value='All' key='All'>
					All
				</option>
				{movieYears().map((year: any) => (
					<option value={year} key={year}>
						{year}
					</option>
				))}
			</Select>
		</Form>
	);
};

export default FilterMovies;
