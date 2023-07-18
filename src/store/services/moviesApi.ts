import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type Movie from '../../types/movie';
import type GetRequestArguements from '../../types/get-request-arguements';
import { supabase } from '../../supabaseClient';

type MovieResult = {
	movies: Movie[];
	count: number;
};

export const moviesApi = createApi({
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Movies'],
	refetchOnReconnect: true,
	reducerPath: 'moviesApi',
	endpoints: (build) => ({
		getMovies: build.query<MovieResult, any>({
			queryFn: async ({
				orderBy,
				isAscending,
				rangeFrom,
				rangeTo,
			}: GetRequestArguements): Promise<any> => {
				const { data, count, error } = await supabase
					.from('movies')
					.select('*', { count: 'exact' })
					.order(orderBy as string, { ascending: isAscending })
					.range(rangeFrom, rangeTo);
				if (error) {
					throw new Error(error.message); // throw an error object
				}
				return {
					data: {
						movies: data,
						count: count,
					},
				};
			},
			providesTags: (result) =>
				// is result available?
				result
					? // successful query
					  [
							...result.movies.map(({ id }) => ({ type: 'Movies', id } as const)),
							{ type: 'Movies', id: 'LIST' },
					  ]
					: // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
					  [{ type: 'Movies', id: 'LIST' }],
		}),
		getMovie: build.query<Movie, any>({
			queryFn: async (id): Promise<any> => {
				const { data, error } = await supabase.from('movies').select().eq('id', id);
				if (error) {
					throw new Error(error.message); // throw an error object
				}
				return { data: data[0] };
			},
		}),
		createMovie: build.mutation({
			query: (movie: any) => ({
				url: '',
				method: 'POST',
				body: movie,
			}),
			invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
		}),
		updateMovie: build.mutation({
			query: (movie: any) => ({
				url: `?id=eq.${movie.id}`,
				method: 'PATCH',
				body: movie,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Movies', id }],
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useGetMovieQuery,
	useCreateMovieMutation,
	useUpdateMovieMutation,
} = moviesApi;
