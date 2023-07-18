const filterMoviesByYear = (moviesArray: any, year: string) => {
	if (year === 'All') {
		return moviesArray;
	}
	return moviesArray.filter(
		(movie: any) => new Date(movie.release_date).getFullYear().toString() === year
	);
};

export default filterMoviesByYear;
