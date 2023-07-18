import DefaultButton from '../ui/buttons/default-button/DefaultButton';
import { useNavigate } from 'react-router-dom';
import MoviesTable from './MoviesTable';
import GlobalLayout from '../layout/GlobalLayout';

type Props = {};

const Movies = (props: Props) => {
	const navigate = useNavigate();
	const showSendMovieModal = () => {
		navigate('/create-movie');
	};

	return (
		<GlobalLayout>
			<div className='container-large'>
				<DefaultButton
					type='button'
					title='Add movie'
					onClick={showSendMovieModal}
					disabled={false}
					ariaLive='off'
				/>
			</div>
			<MoviesTable />
		</GlobalLayout>
	);
};

export default Movies;
