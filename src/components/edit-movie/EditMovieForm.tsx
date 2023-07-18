import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type MovieInputs from '../../types/movie-inputs';
import UploadingSpinner from '../ui/uploading-spinner/UploadingSpinner';
import SendIcon from '../../assets/media/icons/SendIcon';
import CheckIcon from '../../assets/media/icons/CheckIcon';
import ErrorIcon from '../../assets/media/icons/ErrorIcon';
import { useUpdateMovieMutation, useGetMovieQuery } from '../../store/services/moviesApi';
import { useParams } from 'react-router';
import DefaultButton from '../ui/buttons/default-button/DefaultButton';
import { useNavigate } from 'react-router-dom';
import NoResultsFound from '../request-status/NoResultsFound';
import FailedHttpRequestStatus from '../request-status/FailedHttpRequestStatus';
import LoadingDataStatus from '../request-status/LoadingDataStatus';

type Props = {};

const EditMovieForm = (props: Props) => {
	// const movieId = useAppSelector((state) => state.movies.movieToSend.id);
	const { movieId }: any = useParams();
	const navigate = useNavigate();

	// Create functions using rtk query for editing an existing movie and geting the edit action result
	const [updateMovie, updateMovieResult] = useUpdateMovieMutation({
		fixedCacheKey: 'shared-edit-movie',
	});

	// Create a function using rtk query to select a single movie from the fetched movies list based on the movie id
	const { data: movie, isError, isLoading, isSuccess } = useGetMovieQuery(movieId);

	// Create functions using react hook form to handle the movie form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, dirtyFields, isSubmitSuccessful },
	} = useForm({
		mode: 'all',
		defaultValues: movie as any,
	});

	// Set the form initial values to be either empty or equal to that of the selected movie
	useEffect(() => {
		if (movieId) {
			reset(movie as any);
		}
	}, [movieId, reset, movie]);

	// Handle the submit action of the movie form
	const onSubmit: SubmitHandler<MovieInputs> = (data, errors) => {
		navigate('/');
		updateMovie(data);
	};

	return (
		<div className='container-large' id='send-movie-modal'>
			{isLoading ? (
				<LoadingDataStatus />
			) : isError ? (
				<FailedHttpRequestStatus requestResponseStatus={'Something went wrong'} />
			) : isSuccess && !movie ? (
				<NoResultsFound />
			) : (
				<form id='add-new-movie' onSubmit={handleSubmit(onSubmit)}>
					<fieldset>
						<div>
							<legend>{`Editing movie: ${movie?.title}`}</legend>
						</div>
						<div
							className={`input-control ${
								errors.title
									? 'invalid'
									: (!errors.title && dirtyFields.title) ||
									  isSubmitSuccessful === true
									? 'valid'
									: ''
							}`}>
							<label htmlFor='title'>Title</label>
							<input
								{...register('title', { required: true, maxLength: 75 })}
								type='text'
								id='title'
								name='title'
								maxLength={75}
							/>
							<div className='input-control-validation'>
								{errors.title ? <ErrorIcon /> : <CheckIcon />}

								<p>
									{errors.title?.type === 'required'
										? 'Title field is empty'
										: 'The title field should not be empty'}
								</p>
							</div>
						</div>
						<div
							className={`input-control ${
								errors.excerpt
									? 'invalid'
									: (!errors.excerpt && dirtyFields.excerpt) ||
									  isSubmitSuccessful === true
									? 'valid'
									: ''
							}`}>
							<label htmlFor='excerpt'>Excerpt</label>
							<textarea
								{...register('excerpt', { required: true, maxLength: 300 })}
								id='excerpt'
								name='excerpt'
								maxLength={300}
							/>
							<div className='input-control-validation'>
								{errors.excerpt ? <ErrorIcon /> : <CheckIcon />}
								<p>
									{errors.excerpt?.type === 'required'
										? 'Excerpt field is empty'
										: 'The excerpt field should not be empty'}
								</p>
							</div>
						</div>
						<div
							className={`input-control ${
								errors.rating
									? 'invalid'
									: (!errors.rating && dirtyFields.rating) ||
									  isSubmitSuccessful === true
									? 'valid'
									: ''
							}`}>
							<label htmlFor='rating'>Rating</label>
							<input
								{...register('rating', { required: true, max: 10 })}
								id='rating'
								name='rating'
								type='number'
								max={10}
								step='0.1'
							/>
							<div className='input-control-validation'>
								{errors.rating ? <ErrorIcon /> : <CheckIcon />}
								<p>
									{errors.rating?.type === 'required'
										? 'Excerpt field is empty'
										: errors.rating?.type === 'max'
										? 'The rating should be a maximum of 10'
										: 'The excerpt field should not be empty'}
								</p>
							</div>
						</div>
						<div
							className={`input-control ${
								errors.release_date
									? 'invalid'
									: (!errors.release_date && dirtyFields.release_date) ||
									  isSubmitSuccessful === true
									? 'valid'
									: ''
							}`}>
							<label htmlFor='release_date'>Release Date</label>
							<input
								{...register('release_date', { required: true })}
								id='release_date'
								name='release_date'
								type='date'
							/>
							<div className='input-control-validation'>
								{errors.releaseDate ? <ErrorIcon /> : <CheckIcon />}
								<p>
									{errors.releaseDate?.type === 'required'
										? 'The release date field is empty'
										: 'The release date field should not be empty'}
								</p>
							</div>
						</div>
					</fieldset>
					<div>
						<DefaultButton
							type='submit'
							title={movieId ? 'Update Movie' : 'Add Movie'}
							disabled={updateMovieResult.isLoading ? true : false}
							ariaLive='off'
							icon={
								updateMovieResult.isLoading === false ? (
									<SendIcon />
								) : (
									<UploadingSpinner />
								)
							}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditMovieForm;
