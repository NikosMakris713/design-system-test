import EditMovieForm from './EditMovieForm';
import GlobalLayout from '../layout/GlobalLayout';

type Props = {};

const EditMovie = (props: Props) => {
	return (
		<GlobalLayout>
			<EditMovieForm />
		</GlobalLayout>
	);
};

export default EditMovie;
