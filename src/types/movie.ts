interface Movie {
	id: string;
	title: string;
	excerpt: string;
	rating: number | '';
	release_date: string;
	[key: string]: any;
}

export default Movie;
