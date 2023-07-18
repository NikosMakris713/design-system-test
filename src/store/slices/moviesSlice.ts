import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type Movies from '../../types/movies';

const initialMoviesState: Movies = {
	fetchedMovies: {
		yearToFilterBy: 'All',
	},
	movieToSend: {
		id: null,
	},
	movieModal: {
		operationType: null,
		isVisible: false,
	},
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState: initialMoviesState,
	reducers: {
		setYearToFilterMoviesBy(state, action: PayloadAction<string>) {
			state.fetchedMovies.yearToFilterBy = action.payload;
		},
		getMovieToSendId(state, action) {
			state.movieToSend.id = action.payload;
		},
	},
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;
