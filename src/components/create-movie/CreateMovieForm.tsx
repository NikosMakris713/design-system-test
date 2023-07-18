import { useForm, SubmitHandler } from 'react-hook-form';
import type MovieInputs from '../../types/movie-inputs';
import UploadingSpinner from '../ui/uploading-spinner/UploadingSpinner';
import SendIcon from '../../assets/media/icons/SendIcon';
import CheckIcon from '../../assets/media/icons/CheckIcon';
import ErrorIcon from '../../assets/media/icons/ErrorIcon';
import { useCreateMovieMutation } from '../../store/services/moviesApi';
import DefaultButton from '../ui/buttons/default-button/DefaultButton';
import { useNavigate } from 'react-router-dom';

type Props = {};

const defaultInputValues: MovieInputs = {
	title: '',
	excerpt: '',
	rating: '',
	releaseDate: '',
};

const CreateMovieForm = (props: Props) => {
	const navigate = useNavigate();

	// Create functions using rtk query for creating a new movie and geting the create action result
	const [createMovie, createMovieResult] = useCreateMovieMutation({
		fixedCacheKey: 'shared-create-movie',
	});

	// Create functions using react hook form to handle the movie form
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, isSubmitSuccessful },
	} = useForm<MovieInputs>({
		mode: 'all',
		defaultValues: defaultInputValues,
	});

	// Handle the submit action of the movie form
	const onSubmit: SubmitHandler<MovieInputs> = (data, errors) => {
		createMovie(data);
	};

	return (
		<div className='container-large' id='send-movie-modal'>
			<form id='add-new-movie' onSubmit={handleSubmit(onSubmit)}>
				<fieldset>
					<div>
						<legend>Add a new movie</legend>
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
							errors.releaseDate
								? 'invalid'
								: (!errors.releaseDate && dirtyFields.releaseDate) ||
								  isSubmitSuccessful === true
								? 'valid'
								: ''
						}`}>
						<label htmlFor='releaseDate'>Release Date</label>
						<input
							{...register('releaseDate', { required: true })}
							id='releaseDate'
							name='releaseDate'
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
						title='Add Movie'
						disabled={createMovieResult.isLoading ? true : false}
						ariaLive='off'
						icon={
							createMovieResult.isLoading === false ? (
								<SendIcon />
							) : (
								<UploadingSpinner />
							)
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateMovieForm;
