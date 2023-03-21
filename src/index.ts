import { TMDBClient } from './api/clients/TMDBClient';
import './assets/common.css';
import { MovieList } from './components/MovieList';
import { NewMovie } from './states/NewMovie';

const client = new TMDBClient({
  apiKey: process.env.TMDB_API_KEY!,
});

function assignMovieList(movieList: MovieList) {
  document.querySelector('main')!.replaceChildren(movieList.render());
}

assignMovieList(
  new MovieList('지금 인기있는 영화', new NewMovie((page) => client.getPopularMovies({ page }))),
);

document.querySelector('.logo')!.addEventListener('click', () => {
  assignMovieList(
    new MovieList('지금 인기있는 영화', new NewMovie((page) => client.getPopularMovies({ page }))),
  );
});

document.querySelector('.search-box')!.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  assignMovieList(
    new MovieList(
      `"${query}" 검색결과`,
      new NewMovie((page) => client.searchMovies({ query, page })),
    ),
  );
});
