interface Movies {
	fetchedMovies: {
		yearToFilterBy: string;
	};
	movieToSend: {
		id: string | null;
	};
	movieModal: {
		operationType: 'send' | 'notification' | null;
		isVisible: boolean;
	};
}

export default Movies;
