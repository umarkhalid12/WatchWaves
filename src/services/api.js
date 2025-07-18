import axios from 'axios'
const API_KEY = "1aca40bcfe91e64acfadda72a1d5e52f";
const BASE_URL = "https://api.themoviedb.org/3";


const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results || []; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchGenres = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres || [];  // Genres come in a "genres" key
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};




export const getSearchResults = async (query) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    console.log('Search Results:', response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
export const getMovieDetails = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getTvDetails = async (tvId) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV details:', error);
    return null;
  }
};
// Export API functions
export const getTrendingAll = () => fetchData("/trending/all/week");
export const getDiscoverMovies = () => fetchData("/discover/movie");
export const getDiscoverTvShows = () => fetchData("/discover/tv");
export const getTvGenres = () => fetchGenres("/genre/tv/list");
export const getNowPlayingMovies = () => fetchData("/movie/now_playing");
export const getPopularMovies = () => fetchData("/movie/popular");
export const getTopRatedMovies = () => fetchData("/movie/top_rated");
export const getUpcomingMovies = () => fetchData("/movie/upcoming");
export const getTrendingMovies = () => fetchData("/trending/movie/week");
export const getTrendingTvShows = () => fetchData("/trending/tv/week");
export const getTvSeriesOnAir = () => fetchData("/tv/on_the_air");
export const getPopularTvShows = () => fetchData("/tv/popular");
export const getTopRatedTvShows = () => fetchData("/tv/top_rated");

// ✅ Fixed: Add movie genres API correctly
export const getMovieGenres = () => fetchGenres("/genre/movie/list");
export const getMoviesByGenre = (genreId) => fetchData(`/discover/movie&with_genres=${genreId}`);
