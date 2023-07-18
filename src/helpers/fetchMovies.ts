const fetchMoviesApi = async (requestConfiguration: any) => {
	const response = await fetch(
		'https://react-tutorial-dbbf0-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
		{
			method: requestConfiguration.method ? requestConfiguration.method : 'GET',
			headers: requestConfiguration.headers ? requestConfiguration.headers : {},
			body: requestConfiguration.body ? JSON.stringify(requestConfiguration.body) : null,
		},
	);
};

export default fetchMoviesApi;
