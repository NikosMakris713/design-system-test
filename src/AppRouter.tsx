import { createBrowserRouter } from 'react-router-dom';
import Movies from './components/movies/Movies';
import CreateMovie from './components/create-movie/CreateMovieForm';
import EditMovie from './components/edit-movie/EditMovie';

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <Movies />,
	},
	{
		path: '/movies/page?/:pageNumber?',
		element: <Movies />,
	},
	{
		path: '/movie/edit/:movieId',
		element: <EditMovie />,
	},
	{
		path: '/create-movie',
		element: <CreateMovie />,
	},
]);

export default AppRouter;
