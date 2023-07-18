import GlobalLayout from '../layout/GlobalLayout';
import CreateMovieForm from './CreateMovieForm';

type Props = {};

const CreateMovie = (props: Props) => {
	return (
		<GlobalLayout>
			<CreateMovieForm />
		</GlobalLayout>
	);
};

export default CreateMovie;
