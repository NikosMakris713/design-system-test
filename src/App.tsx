import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AppRouter from './AppRouter';

const App = () => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={AppRouter} />
			</Provider>
		</React.StrictMode>
	);
};

export default App;
