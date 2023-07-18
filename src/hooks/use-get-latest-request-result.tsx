import { useCreateMovieMutation, useUpdateMovieMutation } from '../store/services/moviesApi';
import { useState, useEffect } from 'react';

const useGetLatestRequestResult = () => {
	const [createMovie, createMovieResult] = useCreateMovieMutation({
		fixedCacheKey: 'shared-create-movie',
	});

	const [editMovie, editMovieResult] = useUpdateMovieMutation({
		fixedCacheKey: 'shared-edit-movie',
	});

	const [latestRequestResult, setLatestRequestResult] = useState<boolean | null>(null);

	useEffect(() => {
		if (createMovieResult.isUninitialized && editMovieResult.isUninitialized) {
			setLatestRequestResult(null);
		}
		if (
			editMovieResult.isUninitialized ||
			(createMovieResult.fulfilledTimeStamp as any) > (editMovieResult.fulfilledTimeStamp as any)
		) {
			setLatestRequestResult(createMovieResult.isSuccess);
		} else if (
			createMovieResult.isUninitialized ||
			(createMovieResult.fulfilledTimeStamp as any) < (editMovieResult.fulfilledTimeStamp as any)
		) {
			setLatestRequestResult(editMovieResult.isSuccess);
		}
	}, [
		createMovieResult.isSuccess,
		editMovieResult.isSuccess,
		createMovieResult.isUninitialized,
		editMovieResult.isUninitialized,
		createMovieResult.fulfilledTimeStamp,
		editMovieResult.fulfilledTimeStamp,
		createMovie,
		editMovie,
	]);

	return {
		latestRequestResult,
	};
};

export default useGetLatestRequestResult;
