import { Movie } from './movies.type';

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type TMDBErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

class Client {
  private static readonly API_KEY =
    process.env.TMDB_API_KEY ?? prompt('TMDB API KEY를 입력해주세요');

  private static readonly BASE_URL = 'https://api.themoviedb.org/3';

  async fetch(path: string): Promise<TMDBResponse> {
    const res = await fetch(`${Client.BASE_URL}${path}&api_key=${Client.API_KEY}`);
    if (!res.ok) throw await res.json();

    const response: TMDBResponse = await res.json();
    return response;
  }

  async getPopularMovies(page = 1): Promise<TMDBResponse> {
    return this.fetch(`/movie/popular?language=ko-KR&page=${page}`);
  }

  async getSearchMovies(query: string, page = 1): Promise<TMDBResponse> {
    return this.fetch(
      `/search/movie?language=ko-KR&query=${query}&page=${page}&include_adult=false`,
    );
  }
}

const client = new Client();

export default client;
